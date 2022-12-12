import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'students'})
export class StudentEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 20, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    male_lastname: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    female_lastname: string;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    code: string;
}