import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AlumnosEntity } from './entity/alumnos.entity';
import { AlumnosDto } from './dto/alumnos.dto';
import { PuntuacionesEntity } from 'src/puntuaciones/entity/puntuaciones.entity';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';
import { AlumnosLoginDto } from './dto/alumnosLogin.dto';

@Injectable()
export class AlumnosService {
    constructor(private dataSorce: DataSource) { }

    async obtenerAlumnos() {
        try {
            const alumnos = await this.dataSorce
                .getRepository(AlumnosEntity)
                .find({ relations: ['puntuaciones', 'grupos'] });

            if (!alumnos) {
                return new HttpException(
                    'No se encontraron alumnos',
                    HttpStatus.NOT_FOUND,
                );
            }

            return alumnos;
        } catch (error) {
            throw new HttpException(
                'Error al obtener los alumnos',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async obtenerAlumno(id: number) {
        try {
            const alumnosFind = await this.dataSorce
                .getRepository(AlumnosEntity)
                .findOne({ where: { id: id }, relations: ['puntuaciones', 'grupos'] });
            if (!alumnosFind) {
                return new HttpException(
                    'No se encontro el alumno',
                    HttpStatus.NOT_FOUND,
                );
            }
            return alumnosFind;
        } catch (error) {
            throw new HttpException(
                'Error al obtener el alumno',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async agregarAlumno(alumnoBase: AlumnosDto) {
        try {
            const nuevoAlumno = await this.dataSorce
                .getRepository(AlumnosEntity)
                .create(alumnoBase);

            const grupoFind = await this.dataSorce
                .getRepository(GruposEntity)
                .findOne({
                    where: { id_grupo: alumnoBase.gruposId },
                    relations: ['alumnos'],
                });
            if (!grupoFind) {
                return new HttpException(
                    'No se encontro el grupo',
                    HttpStatus.NOT_FOUND,
                );
            }

            const saveAlumno = await this.dataSorce
                .getRepository(AlumnosEntity)
                .save(nuevoAlumno);

            grupoFind.alumnos.push(saveAlumno);

            await this.dataSorce.getRepository(GruposEntity).save(grupoFind);

            return saveAlumno;
        } catch (error) {
            console.log(error);

            throw new HttpException(
                'Error al agregar el alumno',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async eliminarAlumno(id: number) {
        try {
            const alumnoFind = await this.dataSorce
                .getRepository(AlumnosEntity)
                .findOne({ where: { id: id } });
            if (!alumnoFind) {
                return new HttpException(
                    'No se encontro el alumno',
                    HttpStatus.NOT_FOUND,
                );
            }
            return await this.dataSorce
                .getRepository(AlumnosEntity)
                .remove(alumnoFind);
        } catch (error) {
            throw new HttpException(
                'Error al eliminar el alumno',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async actualizarAlumno(id: number, nombre: string) {
        try {
            const alumnoFind = await this.dataSorce
                .getRepository(AlumnosEntity)
                .findOne({ where: { id: id } });

            if (!alumnoFind) {
                return new HttpException(
                    'No se encontro el alumno',
                    HttpStatus.NOT_FOUND,
                );
            }

            alumnoFind.nombre = nombre;
            await this.dataSorce.getRepository(AlumnosEntity).update(id,alumnoFind);
        
            return alumnoFind;

        } catch (error) {
            throw new HttpException(
                'Error al actualizar el alumno',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async obtenerPuntuacionesAlumno(id: number) {
        try {
            const alumnoFind = await this.dataSorce
                .getRepository(AlumnosEntity)
                .findOne({ where: { id: id }, relations: ['puntuaciones'] });

            if (!alumnoFind) {
                return new HttpException(
                    'No se encontro el alumno',
                    HttpStatus.NOT_FOUND,
                );
            }

            return alumnoFind.puntuaciones;
        } catch (error) {
            throw new HttpException(
                'Error al obtener las puntuaciones del alumno',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async loginAlumno(id_Estudiante: number, id_Grupo: number) {
        try {
            // Verificar si existe un alumno con el ID proporcionado y si está asociado al grupo con el ID proporcionado
            const alumno = await this.dataSorce.getRepository(AlumnosEntity).findOne({
                where: {
                    id: id_Estudiante,
                    grupos: { id_grupo: id_Grupo }
                },
                relations: ['grupos'] 
            });
    
            if (alumno) {
                return alumno;
            } else {
                throw new HttpException('No se encontró un alumno válido para el grupo proporcionado', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Error al iniciar sesión como alumno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}
