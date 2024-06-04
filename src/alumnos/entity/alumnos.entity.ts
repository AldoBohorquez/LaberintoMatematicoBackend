import { GruposEntity } from "src/grupos/entity/grupos.entity";
import { PuntuacionesEntity } from "src/puntuaciones/entity/puntuaciones.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('alumnos')
export class AlumnosEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nombre:string

    @OneToMany(()=>PuntuacionesEntity,(puntuaciones)=>puntuaciones.alumnos,{nullable:true})
    puntuaciones:PuntuacionesEntity[]

    @ManyToOne(()=>GruposEntity,(grupos)=>grupos.alumnos)
    grupos:GruposEntity
}