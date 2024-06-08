import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GruposEntity } from './entity/grupos.entity';
import { GruposDto } from './dto/grupos.dto';
import { ProfesoresEntity } from 'src/profesores/entity/profesores.entity';
import { SalasEntity } from 'src/salas/entity/salas.entity';
import { AlumnosEntity } from 'src/alumnos/entity/alumnos.entity';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';

@Injectable()
export class GruposService {
    constructor(private dataSorce: DataSource) {}

    async obtenerGrupos() {
        try {
        const grupos = await this.dataSorce
            .getRepository(GruposEntity)
            .find({ relations: ['profesor', 'salas', 'alumnos'] });
        if (!grupos) {
            return new HttpException(
            'No se encontraron grupos',
            HttpStatus.NOT_FOUND,
            );
        }
        return grupos;
        } catch (error) {
        throw new HttpException(
            'Error al obtener los grupos',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async obtenerGrupo(id: number) {
        try {
        const grupoFind = await this.dataSorce
            .getRepository(GruposEntity)
            .findOne({
            where: { id_grupo: id },
            relations: ['profesor', 'salas', 'alumnos'],
            });
            if (!grupoFind) {
                return new HttpException(
                'No se encontro el grupo',
                HttpStatus.NOT_FOUND,
                );
            }
            console.log(grupoFind);
            
        const puntuaciones = await this.dataSorce.getRepository(PuntuacionesEntity).find();
        const findPuntuaciones = puntuaciones.filter(puntuacion => puntuacion.alumnos.grupos.id_grupo === grupoFind.id_grupo);
        console.log(findPuntuaciones);
        
        if (!findPuntuaciones) {
            return new HttpException(
            'No se encontraron puntuaciones para el grupo',
            HttpStatus.NOT_FOUND,
            );
        }
        return {grupoFind, puntuaciones: findPuntuaciones}
        
        } catch (error) {
        throw new HttpException(
            'Error al obtener el grupo',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async getGruposByProfesor(id: number) {
        try {
        const profesorFind = await this.dataSorce
            .getRepository(ProfesoresEntity)
            .findOne({ where: { id: id }, relations: ['grupos', 'grupos.salas'] });
        if (!profesorFind) {
            return new HttpException(
            'No se encontro el profesor',
            HttpStatus.NOT_FOUND,
            );
        }
        return profesorFind.grupos;
        } catch (error) {
        throw new HttpException(
            'Error al obtener los grupos',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async agregarGrupo(grupoBase: GruposDto) {
        try {
        const nuevoGrupo = await this.dataSorce
            .getRepository(GruposEntity)
            .create(grupoBase);

        const profesorFind = await this.dataSorce
            .getRepository(ProfesoresEntity)
            .findOne({
            where: { id: grupoBase.profesorId },
            relations: ['grupos'],
            });
        if (!profesorFind) {
            return new HttpException(
            'No se encontro el profesor',
            HttpStatus.NOT_FOUND,
            );
        }

        const sala = await this.dataSorce
            .getRepository(SalasEntity)
            .create({ active: false });

        await this.dataSorce.getRepository(SalasEntity).save(sala);

        nuevoGrupo.salas = sala;

        const saveGrupo = await this.dataSorce
            .getRepository(GruposEntity)
            .save(nuevoGrupo);

        profesorFind.grupos.push(saveGrupo);

        await this.dataSorce.getRepository(ProfesoresEntity).save(profesorFind);

        sala.gruposId = saveGrupo.id_grupo;

        await this.dataSorce.getRepository(SalasEntity).save(sala);

        return saveGrupo;
        } catch (error) {
        throw new HttpException(
            'Error al agregar el grupo',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async eliminarGrupo(id: number) {
        try {
        const grupoFind = await this.dataSorce
            .getRepository(GruposEntity)
            .findOne({ where: { id_grupo: id } });
        if (!grupoFind) {
            return new HttpException(
            'No se encontro el grupo',
            HttpStatus.NOT_FOUND,
            );
        }

        return await this.dataSorce.getRepository(GruposEntity).remove(grupoFind);
        } catch (error) {
        throw new HttpException(
            'Error al eliminar el grupo',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async actualizarGrupo(id: number, nombre: string) {
        try {
            const grupoFind = await this.dataSorce
            .getRepository(GruposEntity)
            .findOne({ where: { id_grupo: id } });
    
            if (!grupoFind) {
                throw new HttpException('No se encontró el grupo', HttpStatus.NOT_FOUND);
            }
        
            grupoFind.nombre = nombre;
            await this.dataSorce.getRepository(GruposEntity).update(id,grupoFind);
        
            return grupoFind;
        
        } catch (error) {
        throw new HttpException(
            'Error al actualizar el grupo',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
}
