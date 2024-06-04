import { IsNumber, IsString } from "class-validator"

export class profesoreLoginDto
{
    @IsString()
    usuario:string

    @IsString()
    password:string
}