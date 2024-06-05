import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NivelesEntity } from './entity/niveles.entity';
import { nivelesDto } from './dto/niveles.dto';
import { EjerciciosEntity } from 'src/ejercicios/entity/ejercicios.entity';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';
import { EjerciciosDto } from 'src/ejercicios/dto/ejercicios.dto';
import { respuestasDto } from 'src/respuestas/dto/respuestas.dto';
import { respuestasEntity } from 'src/respuestas/entity/respuestas.entity';

@Injectable()
export class NivelesService {

    constructor(private dataSource: DataSource) { }

    async obtenerNiveles()
    {
        try {
            const niveles = await this.dataSource.getRepository(NivelesEntity).find({relations: ['ejercicios']});

            if (!niveles) {
                return new HttpException("No se encontraron niveles",HttpStatus.NOT_FOUND)
            }

            return niveles;
        } catch (error) {

            throw new HttpException("Error al obtener los niveles",HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    async obtenerNivel(id:number)
    {
        try {
            const nivelesFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id},relations: ['ejercicios']});
            if (!nivelesFind) {
                return new HttpException("No se encontro el nivel",HttpStatus.NOT_FOUND)
            }
            return nivelesFind;
        } catch (error) {
            throw new HttpException("Error al obtener el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarNivel(id:number,nivelBase: nivelesDto)
    {
        try {
            const nivelFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id}});

            if (!nivelFind) {
                return new HttpException("No se encontro el nivel",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(NivelesEntity).update({id_niveles:nivelFind.id_niveles},nivelBase);

        } catch (error) {
            throw new HttpException("Error al actualizar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarNivel(nivelBase: nivelesDto) 
    {
        try {
            const nuevoNivel = await this.dataSource.getRepository(NivelesEntity).create(nivelBase);

            const saveNivel = await this.dataSource.getRepository(NivelesEntity).save(nuevoNivel);

            return saveNivel

        } catch (error) {
            throw new HttpException("Error al agregar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async crearEjercicioRespuestas(nivelId:number,ejercicio:Array<EjerciciosDto>,respuestas:Array<respuestasDto>)
    {
        try {
            const nivelFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:nivelId},relations:['ejercicios']});

            if (!nivelFind) {
                return new HttpException("No se encontro el nivel",HttpStatus.NOT_FOUND)
            }

            for (let i = 0; i < ejercicio.length; i++) {
                const nuevoEjercicio = await this.dataSource.getRepository(EjerciciosEntity).create(ejercicio[i]);
                nuevoEjercicio.niveles = nivelFind;
                const saveEjercicio = await this.dataSource.getRepository(EjerciciosEntity).save(nuevoEjercicio);
                nivelFind.ejercicios.push(saveEjercicio);
                for (let j = 0; j < respuestas.length; j++) {
                    const nuevaRespuesta = await this.dataSource.getRepository(respuestasEntity).create(respuestas[j]);
                    if(nuevaRespuesta.ejercicios == saveEjercicio)
                        {
                            const saveRespuesta = await this.dataSource.getRepository(respuestasEntity).save(nuevaRespuesta);
                            saveEjercicio.respuesta.push(saveRespuesta);
                        }
                }
            }

            return await this.dataSource.getRepository(NivelesEntity).save(nivelFind);
        } catch (error) {
            throw new HttpException("Error al crear el ejercicio",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarNivel(id:number)
    {
        try {

            const nivelFind = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:id}});

            if (!nivelFind) {
                return new HttpException("No se encontro el nivel",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(NivelesEntity).remove(nivelFind);

        } catch (error) {
            throw new HttpException("Error al eliminar el nivel",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
