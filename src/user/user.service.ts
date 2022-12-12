import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/role.entity';
import { RoleName } from 'src/role/role.enum';
import { RoleRepository } from 'src/role/role.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: RoleRepository,
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository
    ) { }


    async getAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        if (!users.length) throw new NotFoundException({ message: 'No hay usuarios' });
        return users;
    }

    async create(dto: CreateUserDto): Promise<any> {
        const { username, email } = dto;
        const exists = await this.userRepository.findOne({ where: [{ username: username }, { email: email }] });
        if (exists) throw new BadRequestException({ message: 'Ese usuario ya existe' });
        const roleAdmin = await this.roleRepository.findOne({ where: { roleName: RoleName.ADMIN } });
        const roleAdviser = await this.roleRepository.findOne({ where: { roleName: RoleName.ADVISER } });
        const roleUser = await this.roleRepository.findOne({ where: { roleName: RoleName.USER } });
        if (!roleAdmin || !roleAdviser || !roleUser) throw new InternalServerErrorException({ message: 'los roles aún no hay sido creados!' });
        const admin = this.userRepository.create(dto);
        admin.roles = [roleAdmin, roleAdviser, roleUser];
        await this.userRepository.save(admin);
        return { message: 'Nuevo Administrador Creado' };
    }
}
