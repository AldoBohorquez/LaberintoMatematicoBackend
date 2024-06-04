import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SalasEntity } from './entity/salas.entity';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';
import { salasDto } from './dto/salas.dto';
import { activarSalasDto } from './dto/activarSalas.dto';

@Injectable()
export class SalasService {

    constructor(private dataSource:DataSource)
    {
        const interval = 1000 * 60 * 60; 
        setInterval(() => {
            this.checador();
            console.log('Desactivando salas');
            
        }, interval);
    }

    async obtenerSalas()
    {
        try {
            const salas = await this.dataSource.getRepository(SalasEntity).find()
            if(!salas)
            {
                return new HttpException("No se encontraron salas",HttpStatus.NOT_FOUND)
            }

            return salas
        } catch (error) {
            throw new HttpException("Error al obtener las salas",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async obtenerSala(id:number)
    {
        try {

            const salaFind = await this.dataSource.getRepository(SalasEntity).findOne({where:{id:id}})
            if(!salaFind)
            {
                return new HttpException("No se encontro la sala",HttpStatus.NOT_FOUND)
            }

            return salaFind
        } catch (error) {
            throw new HttpException("Error al obtener la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async agregarSala(bodySala:salasDto)
    {
        try {
            const sala = await this.dataSource.getRepository(SalasEntity).create(bodySala)
            if(!sala)
            {
                return new HttpException("No se pudo crear la sala",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(SalasEntity).save(sala)
        } catch (error) {
            throw new HttpException("Error al agregar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async eliminarSala(id:number)
    {
        try {
            const salaFind = await this.dataSource.getRepository(SalasEntity).findOne({where:{id:id}})

            if(!salaFind)
            {
                return new HttpException("No se encontro la sala",HttpStatus.NOT_FOUND)
            }

            return await this.dataSource.getRepository(SalasEntity).remove(salaFind)
        } catch (error) {
            throw new HttpException("Error al eliminar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async activarSala(activateS:activarSalasDto)
    {
        try {
            const salaFind = await this.dataSource.getRepository(SalasEntity).findOne({where:{id:activateS.id}})
            if(!salaFind)
            {
                return new HttpException("No se encontro la sala",HttpStatus.NOT_FOUND)
            }

            salaFind.active = activateS.active;
            salaFind.activeDate = new Date();
            salaFind.desactiveDate = new Date();
            salaFind.desactiveDate.setDate(salaFind.activeDate.getDate() + 7);

            return await this.dataSource.getRepository(SalasEntity).save(salaFind);
        } catch (error) {
            throw new HttpException("Error al activar la sala",HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }


    async checador() {
        try {
            const currentDate = new Date();
            const salas = await this.dataSource.getRepository(SalasEntity).find();
            if (!salas) {
                return new HttpException("No se encontraron salas", HttpStatus.NOT_FOUND);
            }

            for (const sala of salas) {
                if (sala.desactiveDate && currentDate > sala.desactiveDate) {
                    sala.active = false;
                    sala.activeDate = null;
                    sala.desactiveDate = null;
                    await this.dataSource.getRepository(SalasEntity).save(sala);
                }
            }

            return salas;
        } catch (error) {
            throw new HttpException("Error al desactivar las salas", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
