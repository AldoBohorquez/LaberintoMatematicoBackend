import { IsNumber, IsString } from "class-validator"

export class nivelesDto
{

    @IsString()
    name:string

}