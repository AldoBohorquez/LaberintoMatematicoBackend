import { IsNumber, IsString } from "class-validator"

export class profesoresDto
{

    @IsString()
    nombreCompleto:string

    @IsString()
    usuario:string

    @IsString()
    password:string

}