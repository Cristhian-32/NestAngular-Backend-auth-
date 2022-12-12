import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/notblank.decorator";

export class NewUserDto {

    @IsString()
    @MaxLength(10, {message: 'nombre: longitud maxima de 10'})
    name: string;

    @IsNotBlank({message: 'El nombre de usuario no puede estar vacío'})
    @MaxLength(10, {message: 'Nombre: longitud maxima de 10'})
    username: string;

    @IsEmail()
    email: string;

    @IsNotBlank({message: 'La contraseña no puede estar vacia'})
    password: string;
}