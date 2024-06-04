import { IsNumber, IsString } from "class-validator";

export class GruposDto {

    @IsString()
    nombre: string;

    @IsNumber()
    profesorId:number

}