import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/notblank.decorator";

export class LoginUserDto {


    @IsNotBlank({message: 'El usuario no puede estar vacío'})
    username: string;

    @IsNotBlank({message: ' La contraseña no puede estar vacía'})
    password: string;
}