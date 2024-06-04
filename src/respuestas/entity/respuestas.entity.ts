import { EjerciciosEntity } from "src/ejercicios/entity/ejercicios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('respuestas')
export class respuestasEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    respuestas: string;

    @Column({type: 'boolean', default: 'false'})
    valor:boolean;

    @ManyToOne(()=> EjerciciosEntity, (ejercicios)=>ejercicios.respuesta,{nullable:true})
    ejercicios:EjerciciosEntity;
}