import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EjerciciosEntity } from './entity/ejercicios.entity';
import { DataSource } from 'typeorm';
import { EjerciciosDto } from './dto/ejercicios.dto';
import { NivelesEntity } from 'src/niveles/entity/niveles.entity';
import { respuestasEntity } from 'src/respuestas/entity/respuestas.entity';

@Injectable()
export class EjerciciosService {

    constructor(private dataSorce:DataSource)
    {}

    async obtenerEjercicios()
    {
        try {
            const ejercicios =await this.dataSorce.getRepository(EjerciciosEntity).find({relations:['niveles','respuesta']})
            if (!ejercicios) {
                return new HttpException('No se encontraron ejercicios',HttpStatus.NOT_FOUND)
            }
            return ejercicios
        } catch (error) {
            throw new HttpException('Error al obtener los ejercicios',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerEjerciciosNivel(name:string)
    {
        try {
            const finNivel = await this.dataSorce.getRepository(NivelesEntity).findOne({where:{name:name}})
            const ejercicios =await this.dataSorce.getRepository(EjerciciosEntity).find({where:{niveles:finNivel},relations:['niveles','respuesta']})
            if (!ejercicios) {
                return new HttpException('No se encontraron ejercicios',HttpStatus.NOT_FOUND)
            }
            return ejercicios
        } catch (error) {
            throw new HttpException('Error al obtener los ejercicios',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerEjercicio(id:number)
    {
        try {
            const ejerciciosFind =await this.dataSorce.getRepository(EjerciciosEntity).findOne({where:{id:id},relations:['niveles','respuesta']})
            if (!ejerciciosFind) {
                return new HttpException('No se encontro el ejercicio',HttpStatus.NOT_FOUND)
            }
            return ejerciciosFind
        } catch (error) {
            throw new HttpException('Error al obtener el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarEjercicio(ejercicioBase:EjerciciosDto)
    {
        try {
            const nuevoEjercicio = await this.dataSorce.getRepository(EjerciciosEntity).create(ejercicioBase)
            const nivelFind = await this.dataSorce.getRepository(NivelesEntity).findOne({where:{id_niveles:ejercicioBase.nivelesId},relations:['ejercicios']})
            if (!nivelFind) {
                return new HttpException('No se encontro el nivel',HttpStatus.NOT_FOUND)
            }


            const ejerciciosSave = await this.dataSorce.getRepository(EjerciciosEntity).save(nuevoEjercicio)

            nivelFind.ejercicios.push(ejerciciosSave)

            await this.dataSorce.getRepository(NivelesEntity).save(nivelFind)

            return ejerciciosSave
        } catch (error) {
            console.log(error);
            
            throw new HttpException('Error al agregar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarEjercicio(id:number)
    {
        try {
            const ejercicioFind = await this.dataSorce.getRepository(EjerciciosEntity).findOne({where:{id:id}})
            if (!ejercicioFind) {
                return new HttpException('No se encontro el ejercicio',HttpStatus.NOT_FOUND)
            }
            return await this.dataSorce.getRepository(EjerciciosEntity).remove(ejercicioFind)
        } catch (error) {
            throw new HttpException('Error al eliminar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarEjercicio(id:number,ejercicioBase:EjerciciosDto)
    {
        try {
            const ejercicioFind = await this.dataSorce.getRepository(EjerciciosEntity).findOne({where:{id:id}})
            if (!ejercicioFind) {
                return new HttpException('No se encontro el ejercicio',HttpStatus.NOT_FOUND)
            }
            return await this.dataSorce.getRepository(EjerciciosEntity).update({id:ejercicioFind.id},ejercicioBase)
        } catch (error) {
            throw new HttpException('Error al actualizar el ejercicio',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
