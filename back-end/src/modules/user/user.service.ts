import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    public async getUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                uuid
            }
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user;
    }


    public async getUsers() {
        return await this.userRepository.find();
    }

    async createUser(userDto: CreateUserDto) {
        const user = this.userRepository.create({
            email: userDto.email,
            password: userDto.password,
            firstName: userDto.firstName,
            lastName: userDto.lastName
        })

        if (!user) {
            throw new BadRequestException('Something went wrong')
        }

        return await this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user;
    }
}
