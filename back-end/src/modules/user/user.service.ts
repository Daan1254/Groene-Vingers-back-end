import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    public async getUser(uuid: string) {
        return await this.prisma.user.findUnique({
            where: {
                uuid
            }
        })
    }


    // public async getUsers() {
    //     return await this.userRepository.find();
    // }
    //
    // async createUser(userDto: CreateUserDto) {
    //     const user = this.userRepository.create({
    //         email: userDto.email,
    //         password: userDto.password,
    //         firstName: userDto.firstName,
    //         lastName: userDto.lastName
    //     })
    //
    //     if (!user) {
    //         throw new BadRequestException('Something went wrong')
    //     }
    //
    //     return await this.userRepository.save(user);
    // }
    //
    // async getUserByEmail(email: string) {
    //     const user = await this.userRepository.findOne({
    //         where: {
    //             email
    //         }
    //     })
    //
    //     if (!user) {
    //         throw new NotFoundException('User not found')
    //     }
    //
    //     return user;
    // }
}
