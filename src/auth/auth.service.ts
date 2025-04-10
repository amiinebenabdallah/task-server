import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: username },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = {
          username: user.email,
          attributes: {
            id: user.id,
          },
        };

        const accessToken = this.jwtService.sign(payload, {
          expiresIn: '1d',
        });

        return {
          ...payload,
          accessToken,
        };
      }
    }

    throw new UnauthorizedException();
  }

  async register(userData: CreateUserDto) {
    const { password, ...userInfo } = userData as {
      password: string;
      email: string;
    };
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    return this.prisma.users.create({
      data: {
        email: userInfo.email,
        password: hashedPassword,
      },
    });
  }
}
