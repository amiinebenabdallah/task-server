import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    try {
      return await this.authService.validateUser({
        username: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      // we hide the error message to prevent leaking information
      if (error instanceof UnauthorizedException) {
        throw new HttpException(
          { statusCode: 401, message: 'Invalid credentials' },
          401,
        );
      }
      throw new HttpException(
        { statusCode: 500, message: 'Login failed due to server error' },
        500,
      );
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: CreateUserDto) {
    try {
      return await this.authService.register(user);
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        // we hide the error message to prevent leaking information
        throw new HttpException(
          {
            statusCode: 400,
            message:
              'Registration failed. Please try with different credentials.',
          },
          400,
        );
      }
      throw new HttpException(
        { statusCode: 500, message: 'Registration failed' },
        500,
      );
    }
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: any) {
    try {
      return req.user;
    } catch (error) {
      throw new HttpException(
        { statusCode: 500, message: 'Failed to retrieve user status' },
        500,
      );
    }
  }
}
