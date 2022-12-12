import { Repository } from 'typeorm';
import { StudentEntity } from "./student.entity";


export class StudentRepository extends Repository<StudentEntity> {}