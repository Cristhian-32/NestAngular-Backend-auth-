import { RoleEntity } from "src/role/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 15, nullable:true})
    name: string;

    @Column({type: 'varchar', length: 15, nullable:true, unique: true})
    username: string;

    @Column({type: 'varchar', length: 15, nullable:true, unique: true})
    email: string;

    @Column({type: 'varchar', nullable:true})
    password: string;

    @ManyToMany(type => RoleEntity, role =>role.users, {eager: true})
    @JoinTable({
        name: 'user_role',
        joinColumn: {name: 'user_id'},
        inverseJoinColumn: {name: 'role_id'}
    })
    roles: RoleEntity[];
}