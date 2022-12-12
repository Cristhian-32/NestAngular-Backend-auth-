import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: RoleRepository) { }

    async getAll(): Promise<RoleEntity[]> {
        const roles = await this.roleRepository.find();
        if (!roles.length) throw new NotFoundException({ message: 'No hay roles en la lista' });
        return roles;
    }

    async create(dto: CreateRoleDto): Promise<any> {
        //const exists = await this.roleRepository.findOne({where: {roleName: dto.roleName}});
        //if (exists) throw new BadRequestException({message: 'Ese Rol ya existe'});
        await this.roleRepository.save(dto as RoleEntity);
        return { message: 'Role Creado'};
    }
}
