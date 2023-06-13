import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getUser(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(userDto: CreateUserDto) {
    const hashedPassword = hashSync(userDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...userDto,
        password: hashedPassword,
        // const user = await this.prisma.user.create({
        //   data: {
        //     ...userDto,
        //     password: userDto.password,
      },
    });

    if (!user) {
      throw new BadRequestException('Something went wrong while creating user');
    }

    return user;
  }

  async updateUser(userDto: UpdateUserDto, uuid: string) {
    let hashedPassword = null;
    if (userDto.password) {
      hashedPassword = hashSync(userDto.password, 10);
    }
    const user = await this.prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: {
        username: userDto.username,
        email: userDto.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new BadRequestException('Something went wrong while creating user');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
