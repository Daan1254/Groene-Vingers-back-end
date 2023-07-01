import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  public async login(body: LoginDto) {
    const user = await this.userService.getUserByEmail(body.email);

    if (!user) {
      throw new Error('User not found');
    }

    if (!compareSync(body.password, user.password)) {
      throw new BadRequestException('WRONG_PASSWORD');
    }

    return { token: await this.generateToken(user.uuid) };
  }

  public async validateToken(token: string) {
    try {
      const accessToken = await this.prisma.accessToken.findUnique({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });

      if (!accessToken) {
        throw new UnauthorizedException('Token not found');
      }

      if (accessToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Token expired');
      }

      return accessToken.user;
    } catch (e) {
      throw new UnauthorizedException('Token not found');
    }
  }

  private async generateToken(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const now = new Date();
    const token = await this.prisma.accessToken.create({
      data: {
        user: {
          connect: {
            uuid,
          },
        },
        token: crypto.randomBytes(64).toString('hex'),
        expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      },
    });

    return token.token;
  }

  async register(loginDto: LoginDto) {
    const exists =
      (await this.prisma.user.count({
        where: {
          email: loginDto.email,
        },
      })) > 0;

    if (exists) {
      throw new BadRequestException('Dit email is al in gebruik!');
    }

    await this.prisma.user.create({
      data: {
        email: loginDto.email,
        password: hashSync(loginDto.password, 10),
      },
    });

    return 'ok';
  }
}
