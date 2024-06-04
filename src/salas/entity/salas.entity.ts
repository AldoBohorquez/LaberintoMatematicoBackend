import { GruposEntity } from "src/grupos/entity/grupos.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('salas')
export class SalasEntity
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'boolean',default:false})
    active:boolean

    @Column({type:'integer',nullable:true})
    gruposId:number

    @Column({type:'timestamp',nullable:true})
    activeDate:Date

    @Column({type:'timestamp',nullable:true})
    desactiveDate:Date
}