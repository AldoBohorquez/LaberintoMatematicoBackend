import { IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class respuestasDto{
    @IsString()
    respuestas: string;
    @IsNumber()
    valor:boolean;
    @IsNumber()
    ejercicioId:number;
}