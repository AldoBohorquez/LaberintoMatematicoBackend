import { IsBoolean, IsDate, IsNumber } from "class-validator"

export class salasDto {
    @IsBoolean()
    active:boolean
}