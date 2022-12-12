import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/role.entity';
import { RoleName } from 'src/role/role.enum';
import { RoleRepository } from 'src/role/role.repository';
import { UserEntity } from 'src/user/user.entity';
import { AdviserRepository } from './adviser.repository';
import { NewAdviserDto } from './dto/new-adviser.dto';

@Injectable()
export class AdviserService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: RoleRepository,
        @InjectRepository(UserEntity)
        private readonly adviserRepository: AdviserRepository
    ) { }


    async getAll(): Promise<UserEntity[]> {
        const users = await this.adviserRepository.find();
        if (!users.length) throw new NotFoundException({ message: 'No hay usuarios' });
        return users;
    }

    async create(dto: NewAdviserDto): Promise<any> {
        const { username, email } = dto;
        const exists = await this.adviserRepository.findOne({ where: [{ username: username }, { email: email }] });
        if (exists) throw new BadRequestException({ message: 'Ese usuario ya existe' });
        const roleAdviser = await this.roleRepository.findOne({ where: { roleName: RoleName.ADVISER } });
        if (!roleAdviser) throw new InternalServerErrorException({ message: 'los roles aún no hay sido creados!' });
        const adviser = this.adviserRepository.create(dto);
        adviser.roles = [roleAdviser];
        await this.adviserRepository.save(adviser);
        return { message: 'Nuevo Usuario Asesor Creado'};
    }
}
