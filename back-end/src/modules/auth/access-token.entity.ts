import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class AccessToken {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        nullable: false,
        unique: true,
    })
    token: string

    @ManyToOne(type => User, user => user.accessTokens)
    user: User;
}
