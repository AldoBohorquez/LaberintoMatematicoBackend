import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NivelesEntity } from './entity/niveles.entity';
import { nivelesDto } from './dto/niveles.dto';
import { EjerciciosEntity } from 'src/ejercicios/entity/ejercicios.entity';
import { respuestasEntity } from 'src/respuestas/entity/respuestas.entity';
import { ejercicio } from './dto/ejerciciosIniciales';
import { log } from 'console';

@Injectable()
export class NivelesService {

    constructor(private dataSource: DataSource) { }
    private readonly logger = new Logger(NivelesService.name);


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

    async crearEjercicioRespuestasInicial()
    {
        try {
            //Ejercicios iniciales
            const ejercicios = ejercicio;
                this.logger.log("Creando ejercicios iniciales");
            for (let i = 0; i < ejercicios.length; i++) {
                //Buscamos nivel
                const findNivel = await this.dataSource.getRepository(NivelesEntity).findOne({where:{id_niveles:ejercicios[i].nivelesId},relations: ['ejercicios']});
                if (!findNivel) {
                    return new HttpException("No se encontro el nivel",HttpStatus.NOT_FOUND)
                }
                console.log(findNivel);
                
                //Creamos la estructura del ejercicio para ejerciciosEntity
                const structurEjercicio = {
                    ejercicio: ejercicios[i].ejercicio,
                    niveles: findNivel
                }
                console.log(structurEjercicio);
                
                //creamos el cuerpo del ejercicio
                const nuevoEjercicio = await this.dataSource.getRepository(EjerciciosEntity).create(structurEjercicio);
                //Guardamos el ejercicio
                const saveEjercicio = await this.dataSource.getRepository(EjerciciosEntity).save(nuevoEjercicio);


                //Agregamos el ejercicio al nivel
                findNivel.ejercicios.push(saveEjercicio);

                //Guardamos el nivel
                await this.dataSource.getRepository(NivelesEntity).save(findNivel);

                //Creamos las respuestas
                const respuestas = ejercicios[i].respuestas;
                //Recorremos las respuestas
                for (let j = 0; j < respuestas.length; j++) {
                    //Creamos la estructura de las respuestas
                    const structurRespuesta = {
                        respuestas: respuestas[j].respuestas,
                        valor: respuestas[j].valor,
                        ejercicios: saveEjercicio
                    }
                    //Guardamos las respuestas si el ejercicioId es igual al id del ejercicio
                    if (respuestas[j].ejercicioId === saveEjercicio.id) {
                        const nuevoRespuesta = await this.dataSource.getRepository(respuestasEntity).create(structurRespuesta);
                        structurRespuesta.ejercicios = saveEjercicio;
                        await this.dataSource.getRepository(respuestasEntity).save(nuevoRespuesta);
                    }
                }
            }
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
