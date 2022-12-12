import { Repository } from "typeorm";
import { UserEntity } from "./../user/user.entity";


export class AuthRepository extends Repository<UserEntity> {

}