import { EjerciciosDto } from "src/ejercicios/dto/ejercicios.dto";
import { respuestasDto } from "src/respuestas/dto/respuestas.dto";

export class ejerciciosRespDto {
    nivelId:number;
    ejercicio:Array<EjerciciosDto>
    respuestas:Array<respuestasDto>
}