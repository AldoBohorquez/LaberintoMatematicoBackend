import { IsNumber, IsString } from "class-validator";

export class AlumnosDto {

    @IsString()
    nombre:string

    @IsNumber()
    gruposId: any;
}