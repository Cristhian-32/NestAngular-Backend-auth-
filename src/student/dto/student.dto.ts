import { IsString, IsNotEmpty } from "class-validator";
import { IsNotBlank } from "src/decorators/notblank.decorator";

export class StudentDto {


    @IsNotBlank({message: 'El campo no puede estar vacío'})
    name?: string;

    @IsString()
    @IsNotEmpty()
    male_lastname?: string;

    @IsString()
    @IsNotEmpty()
    female_lastname: string;

    @IsString()
    @IsNotEmpty()
    code?: string;
}