import { respuestasInicialesDto } from "./respuestasIniciales.dto"

export class ejerciciosInicialesDto
{
    ejercicio: string
    nivelesId: number
    respuestas:Array<respuestasInicialesDto>
}