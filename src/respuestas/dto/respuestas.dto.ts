import { IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class respuestasDto{
    @IsString()
    respuestas: string;
    @IsNumber()
    valor:number;
    @IsNumber()
    ejercicioId:number;
}