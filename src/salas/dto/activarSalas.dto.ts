import { IsBoolean, IsNumber } from "class-validator";

export class activarSalasDto
{
    @IsNumber({},{message:'El id debe ser un numero'}) 
    id:number

    @IsBoolean({message:'El estado debe ser un booleano'})
    active:boolean
}