import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NivelesEntity } from './entity/niveles.entity';
import { nivelesDto } from './dto/niveles.dto';
import { EjerciciosEntity } from 'src/ejercicios/entity/ejercicios.entity';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';

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
