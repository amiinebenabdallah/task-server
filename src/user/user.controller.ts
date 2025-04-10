import { Controller, Get, UseGuards, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        { statusCode: 500, message: 'Failed to fetch users' },
        500
      );
    }
  }
}
