import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PuntuacionesEntity } from './entity/puntuaciones.entity';
import { puntuacionesDto } from './dto/puntuaciones.dto';
import { NivelesEntity } from 'src/niveles/entity/niveles.entity';
import { AlumnosEntity } from 'src/alumnos/entity/alumnos.entity';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';
import { PuntuacionesAluNivel } from './dto/puntacionesAluNivel';

@Injectable()
export class PuntuacionesService {

    constructor(private dataSource:DataSource) 
    {

    }

    async obtenerPuntuaciones()
    {
        try {
            const puntuaciones =  await this.dataSource.getRepository(PuntuacionesEntity).find({relations:['alumnos']});
            if (!puntuaciones) {
                return new HttpException("No se encontraron puntuaciones",HttpStatus.NOT_FOUND)
            }
            return puntuaciones;
        } catch (error) {
            throw new HttpException("Error al obtener las puntuaciones",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerPuntuacionesAlumnoNivel(idAlumno:number, level:number) {
        try {

            const findNivel = await this.dataSource.getRepository(NivelesEntity).findOne({ where: { id_niveles:level } });
            if (!findNivel) {
                throw new HttpException("No se encontró el nivel", HttpStatus.NOT_FOUND);
            }
    
            const puntuacionesFind = await this.dataSource.getRepository(PuntuacionesEntity).find({
                where: { alumnos: { id: idAlumno }, nivel: findNivel.name }
            });
    
            if (puntuacionesFind.length === 0) {
                return new HttpException("No se encontraron puntuaciones",HttpStatus.NOT_FOUND)
            }else{
                return puntuacionesFind;
            }
    
        } catch (error) {
            throw new HttpException("Error al obtener las puntuaciones", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

    async obtenerPuntuacion(id:number)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id},relations:['alumnos']});
            if (!puntuacionFind) {
                return new HttpException("No se encontro la puntuacion",HttpStatus.NOT_FOUND)
            }
            return puntuacionFind;
        } catch (error) {
            throw new HttpException("Error al obtener la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarPuntuacion(puntuacionBase:puntuacionesDto)
    {
        try {
            const nuevaPuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).create(puntuacionBase);

            const findGrupo = await this.dataSource.getRepository(GruposEntity).findOne({where:{id_grupo:puntuacionBase.grupoId}});

            if (!findGrupo) {
                return new HttpException("No se encontro el grupo",HttpStatus.NOT_FOUND)
            }

            const alumnoFind = await this.dataSource.getRepository(AlumnosEntity).findOne({where:{id:puntuacionBase.alumnosId,grupos:{id_grupo:puntuacionBase.grupoId}},relations:['puntuaciones']});
            if (!alumnoFind) {
                return new HttpException("No se encontro el alumno",HttpStatus.NOT_FOUND)
            }

            const savePuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).save(nuevaPuntuacion);

            alumnoFind.puntuaciones.push(savePuntuacion);

            await this.dataSource.getRepository(AlumnosEntity).save(alumnoFind);

            return savePuntuacion
        } catch (error) {
            console.log(error);
            
            throw new HttpException("Error al agregar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async actualizarPuntuacion(id:number,puntuacionBase:puntuacionesDto)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id}});
            if (!puntuacionFind) {
                return new HttpException("No se encontro la puntuacion",HttpStatus.NOT_FOUND)
            }

            const updatePuntuacion = await this.dataSource.getRepository(PuntuacionesEntity).update({id:puntuacionFind.id},puntuacionBase);

            return updatePuntuacion.raw;
        } catch (error) {
            throw new HttpException("Error al actualizar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarPuntuacion(id:number)
    {
        try {
            const puntuacionFind = await this.dataSource.getRepository(PuntuacionesEntity).findOne({where:{id:id}});
            if (!puntuacionFind) {
                return new HttpException("No se encontro la puntuacion",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(PuntuacionesEntity).remove(puntuacionFind);
        } catch (error) {
            throw new HttpException("Error al eliminar la puntuacion",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerPuntuacionesPorNivel(nivel: number) {
        try {

            const findNivel = await this.dataSource.getRepository(NivelesEntity).findOne({ where: { id_niveles:nivel} });
            if (!findNivel) {
                throw new HttpException("No se encontró el nivel", HttpStatus.NOT_FOUND);
            }

            const puntuaciones = await this.dataSource.getRepository(PuntuacionesEntity).find({
                where: {
                    nivel: findNivel.name
                }
            });
    
            if (!puntuaciones || puntuaciones.length === 0) {
                return new HttpException("No se encontraron puntuaciones para este nivel", HttpStatus.NOT_FOUND);
            }
    
            return puntuaciones;
        } catch (error) {
            throw new HttpException("Error al obtener las puntuaciones por nivel", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
