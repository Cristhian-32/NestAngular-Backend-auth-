import { RoleName } from "../role.enum";
import { IsEnum } from "class-validator";

export class CreateRoleDto {
    
    @IsEnum(RoleName, {message: 'El rol solo puede ser admin, adviser o user'})
    roleName: string;
}