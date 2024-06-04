import { IsNumber, IsString } from "class-validator"

export class puntuacionesDto
{

    @IsNumber()
    puntuacionObtenida:number

    @IsNumber()
    grupoId:number

    @IsNumber()
    alumnosId:number

    @IsString()
    nivel:string
}