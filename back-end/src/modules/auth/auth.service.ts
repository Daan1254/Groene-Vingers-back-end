import {BadRequestException, Injectable} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";
import {UserService} from "../user/user.service";
import {compareSync} from "bcrypt";
import {User} from "../user/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AccessToken} from "./access-token.entity";
import {Repository} from "typeorm";
import * as crypto from "crypto";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        @InjectRepository(AccessToken) private readonly accessTokenRepository: Repository<AccessToken>)
    {}


    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)
        if (!compareSync(loginDto.password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }
        await this.generateToken(user)
        return user;
    }

    async verify(token: string) {

    }

    private async generateToken(user: User) {
        const accessToken = this.accessTokenRepository.create({
            user,
            token: crypto.randomBytes(32).toString('hex')
        })

        return await this.accessTokenRepository.save(accessToken);
    }
}
