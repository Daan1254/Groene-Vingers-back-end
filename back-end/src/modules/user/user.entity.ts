import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {isNil} from "@nestjs/common/utils/shared.utils";
import {hashSync} from "bcrypt";
import {AccessToken} from "../auth/access-token.entity";

export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    USER = 'USER'
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({
        enum: UserRole,
        default: UserRole.USER,
        type: 'enum'
    })
    role: UserRole;


    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @OneToMany(type => AccessToken, accessToken => accessToken.user)
    accessTokens: AccessToken[];

    @BeforeInsert()
    private encryptPassword() {
        if ( !isNil(this.password) ) {
            this.password = hashSync(this.password, 10);
        }
    }
}
