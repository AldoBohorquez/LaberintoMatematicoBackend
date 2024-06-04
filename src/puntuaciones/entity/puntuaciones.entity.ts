import { AlumnosEntity } from "src/alumnos/entity/alumnos.entity";
import { NivelesEntity } from "src/niveles/entity/niveles.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('puntuaciones')
export class PuntuacionesEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'real'})
    puntuacionObtenida:number

    @Column({type:'varchar'})
    nivel:string
    
    @ManyToOne(()=>AlumnosEntity,(alumnos)=>alumnos.puntuaciones,{nullable:true})
    alumnos:AlumnosEntity
    
}