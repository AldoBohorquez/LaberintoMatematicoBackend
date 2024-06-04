import { NivelesEntity } from "src/niveles/entity/niveles.entity";
import { respuestasEntity } from "src/respuestas/entity/respuestas.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ejercicios')
export class EjerciciosEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    ejercicio:string

    @ManyToOne(()=>NivelesEntity,(niveles)=>niveles.ejercicios,{nullable:true})
    niveles:NivelesEntity

    @OneToMany(()=>respuestasEntity, (resp) => resp.ejercicios, {nullable:true})
    respuesta:respuestasEntity[];
}