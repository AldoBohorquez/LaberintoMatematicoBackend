import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { respuestasEntity } from './entity/respuestas.entity';
import { respuestasDto } from './dto/respuestas.dto';
import { EjerciciosEntity } from 'src/ejercicios/entity/ejercicios.entity';
import { log } from 'console';

@Injectable()
export class RespuestasService {

    constructor(private datasource: DataSource) {}

    async getRespuestas() {
        try { 
            const respuestas = await this.datasource.getRepository(respuestasEntity).find({relations:['ejercicios']});

            if (!respuestas) {
                return new HttpException("No se encontraron respuestas",HttpStatus.NOT_FOUND)
            }
            return respuestas;
        
        } catch (error) {  
            throw new HttpException("Error al obtener las respuestas",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async getREspuesta(idObtenido: number) {
        try {
            const respuestaFind = await this.datasource.getRepository(respuestasEntity).findOne({where:{id:idObtenido}});
            if(!respuestaFind){
                return new HttpException("No se encontro la respuesta",HttpStatus.NOT_FOUND)
            }
            return respuestaFind;
            
        } catch (error) {
            throw new HttpException("Error al obtener la respuesta",HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    
    async addRespuestas(bodyResp:respuestasDto){
        try {
            const respuestas = await this.datasource.getRepository(respuestasEntity).create(bodyResp);

            const ejerciciosFind = await this.datasource.getRepository(EjerciciosEntity).findOne({where:{id:bodyResp.ejercicioId},relations:['respuesta']});
            if(!ejerciciosFind){
                return new HttpException("No se encontro el ejercicio",HttpStatus.NOT_FOUND)
            }

            const saveRespuesta = await this.datasource.getRepository(respuestasEntity).save(respuestas);

            ejerciciosFind.respuesta.push(saveRespuesta);

            await this.datasource.getRepository(EjerciciosEntity).save(ejerciciosFind);
            return saveRespuesta;
            
        } catch (error) {
            console.log(error);
            
            throw new HttpException("Error al agregar la respuesta",HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }

    async deleteRespuesta(idObtenido:number){
        try {
            const findRespuesta = await this.datasource.getRepository(respuestasEntity).findOne({where:{id:idObtenido}});
            if(!findRespuesta){
                return new HttpException("No se encontro la respuesta",HttpStatus.NOT_FOUND)
            }

            return await this.datasource.getRepository(respuestasEntity).remove(findRespuesta);
            
        } catch (error) {
            throw new HttpException("Error al eliminar la respuesta",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateRespuesta(idObtenido:number,bodyResp:respuestasDto){
        try {
            const findRespuesta = await this.datasource.getRepository(respuestasEntity).findOne({where:{id:idObtenido}});
            if(!findRespuesta){
                return new HttpException("No se encontro la respuesta",HttpStatus.NOT_FOUND)
            }
            return await this.datasource.getRepository(respuestasEntity).update({id:findRespuesta.id},bodyResp);
        } catch (error) {
            throw new HttpException("Error al actualizar la respuesta",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
