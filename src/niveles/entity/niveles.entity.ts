import { IsNumber, IsString, isString } from "class-validator";
import { EjerciciosEntity } from "src/ejercicios/entity/ejercicios.entity";
import { PuntuacionesEntity } from "src/puntuaciones/entity/puntuaciones.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('niveles')
export class NivelesEntity
{

    @PrimaryGeneratedColumn()
    id_niveles:number

    @Column({type:'varchar'})
    name:string

    @OneToMany(()=>EjerciciosEntity,(ejercicios)=>ejercicios.niveles,{nullable:true})
    ejercicios:EjerciciosEntity[]
    

}