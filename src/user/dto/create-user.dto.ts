import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/notblank.decorator";

export class CreateUserDto {

    @IsString()
    @MaxLength(10, {message: 'nombre: longitud maxima de 10'})
    name: string;

    @IsNotBlank({message: 'el nombre de usuario no puede estar vacio'})
    @MaxLength(10, {message: 'nombre: longitud maxima de 10'})
    username: string;

    @IsEmail()
    email: string;

    @IsNotBlank({message: 'la contraseña no puede estar vacia'})
    password: string;
}