import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "./role.enum";

@Entity({name: 'roles'})
export class RoleEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 15, nullable:false, unique: true})
    roleName: RoleName;

    @ManyToMany(type => UserEntity, user =>user.roles)
    users: UserEntity[];

}