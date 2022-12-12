import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleEntity } from 'src/role/role.entity';
import { RoleName } from 'src/role/role.enum';
import { RoleRepository } from 'src/role/role.repository';
import { UserEntity } from 'src/user/user.entity';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { NewUserDto } from './dto/new-user.dto';
import { PayloadInterface } from './payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: RoleRepository,
        @InjectRepository(UserEntity)
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService

    ) { }


    async getAll(): Promise<UserEntity[]> {
        const users = await this.authRepository.find();
        if (!users.length) throw new NotFoundException({ message: 'No hay usuarios' });
        return users;
    }

    async create(dto: NewUserDto): Promise<any> {
        const { username, email } = dto;
        const exists = await this.authRepository.findOne({ where: [{ username: username }, { email: email }] });
        if (exists) throw new BadRequestException({ message: 'Ese usuario ya existe' });
        const roleUser = await this.roleRepository.findOne({ where: { roleName: RoleName.USER } });
        if (!roleUser) throw new InternalServerErrorException({ message: 'los roles aún no hay sido creados!' });
        const user = this.authRepository.create(dto);
        user.roles = [roleUser];
        await this.authRepository.save(user);
        return { message: 'Nuevo Usuario Creado' };
    }

    async login(dto: LoginUserDto): Promise<any> {
        const { username } = dto;
        const user = await this.authRepository.findOne({ where: [{ username: username }, { email: username }] });
        if (!user) return new UnauthorizedException({ message: 'El usuario no existe' });
        const passwordOK = await compare(dto.password, user.password);
        if (!passwordOK) return new UnauthorizedException({ message: 'Usuario y/o contraseña incorrectos' });
        const payload: PayloadInterface = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => role.roleName as RoleName)
        }
        const token = await this.jwtService.sign(payload);
        return {token};
    }
}
