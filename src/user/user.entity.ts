import { hash } from "bcryptjs";
import { RoleEntity } from "src/role/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 10, nullable:true})
    name: string;

    @Column({type: 'varchar', length: 10, nullable:true, unique: true})
    username: string;

    @Column({type: 'varchar', length: 10, nullable:true, unique: true})
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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }
}