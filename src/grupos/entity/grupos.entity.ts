import { AlumnosEntity } from "src/alumnos/entity/alumnos.entity";
import { ProfesoresEntity } from "src/profesores/entity/profesores.entity";
import { SalasEntity } from "src/salas/entity/salas.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('grupos')
export class GruposEntity
{
    @PrimaryGeneratedColumn()
    id_grupo:number

    @Column({type:'varchar'})
    nombre:string

    @ManyToOne(()=>ProfesoresEntity,(profesores)=>profesores.grupos,{nullable:true})
    profesor:ProfesoresEntity

    @OneToOne(()=>SalasEntity,(salas)=>salas.gruposId,{onDelete:'CASCADE'})
    @JoinColumn({name:'salasId'})
    salas:SalasEntity
    @OneToMany(()=>AlumnosEntity,(alumnos)=>alumnos.grupos,{nullable:true})
    alumnos:AlumnosEntity[]
    
}