import { StudentDto } from './dto/student.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: StudentRepository
    ) { }

    async getAll(): Promise<StudentEntity[]> {
        const list = await this.studentRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'Lista vacia' });
        }
        return list;
    }

    async findById(id: any | number): Promise<StudentEntity> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException({ message: 'no existe' });
        }
        return student;
    }

    async findByCode(code: any | string): Promise<StudentEntity> {
        const student = await this.studentRepository.findOne({ where: { code: code } });
        return student;
    }

    async create(dto: StudentDto): Promise<any> {
        const exists = await this.findByCode(dto.code);
        if (exists) throw new BadRequestException({ message: 'ERROR! El código ya está registrado' });
        const student = this.studentRepository.create(dto);
        await this.studentRepository.save(student);
        return dto;
    }

    async update(id: number, dto: StudentDto): Promise<any> {
        const student = await this.findById(id);
        if (!student)
            throw new BadRequestException({ message: 'No coincide ningún registro' });
        const exists = await this.findByCode(dto.code);
        if (exists && exists.id !== id) throw new BadRequestException({ message: 'El código ya está registrado' });
        dto.name ? student.name = dto.name : student.name = student.name;
        dto.male_lastname ? student.male_lastname = dto.male_lastname : student.male_lastname = student.male_lastname;
        dto.female_lastname ? student.female_lastname = dto.female_lastname : student.female_lastname = student.female_lastname;
        dto.code ? student.code = dto.code : student.code = student.code;
        await this.studentRepository.save(student);
        return { message: 'Datos Actualizados' };
    }

    async delete(id: number): Promise<any> {
        const student = await this.findById(id);
        await this.studentRepository.delete(student);
        return { message: 'Estudiante Eliminado' }
    }

}
