import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { UserDto } from '../auth/dto/user.dto';
import { CreateEditUserDto } from './dto/create-edit-user.dto';

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

  async createUser(body: CreateEditUserDto, user: UserDto) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);

    if (body.admin && !user.admin) {
      throw new UnauthorizedException('You are not authorized to do this');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new BadRequestException('Something went wrong while creating user');
    }

    return newUser;
  }

  async updateUser(body: CreateEditUserDto, user: UserDto) {
    if (body.admin && !user.admin) {
      throw new UnauthorizedException('You are not authorized to do this');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        uuid: body.uuid,
      },
      data: {
        ...body,
      },
    });

    if (!updatedUser) {
      throw new BadRequestException('Something went wrong while updating user');
    }

    return updatedUser;
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

  async getRoles() {
    return {
      roles: [
        Role.ADMIN,
        Role.WEB_EMPLOYEE,
        Role.IN_STORE_EMPLOYEE,
        Role.CUSTOMER,
      ],
    };
  }

  async getAllUsers(user: UserDto) {
    if (!user.admin) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return this.prisma.user.findMany();
  }

  async deleteUser(uuid: string, user: UserDto) {
    try {
      if (!user.admin) {
        throw new UnauthorizedException('You are not authorized to do this');
      }

      const deletedUser = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      if (deletedUser.admin) {
        throw new UnauthorizedException('You are not authorized to do this');
      }

      return this.prisma.user.delete({
        where: {
          uuid: uuid,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}
