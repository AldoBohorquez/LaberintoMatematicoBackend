import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProfesoresEntity } from './entity/profesores.entity';
import { profesoresDto } from './dto/profesores.dto';
import { GruposEntity } from 'src/grupos/entity/grupos.entity';

@Injectable()
export class ProfesoresService {
    constructor(private dataSource: DataSource) {}

    async obtenerProfesores() {
        try {
        const profesores = await this.dataSource
            .getRepository(ProfesoresEntity)
            .find({
            relations: ['grupos'],
            select: ['id', 'nombreCompleto', 'usuario'],
            });
        if (!profesores) {
            return new HttpException(
            'No se encontraron profesores',
            HttpStatus.NOT_FOUND,
            );
        }

        return profesores;
        } catch (error) {
        throw new HttpException(
            'Error al obtener los profesores',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async obtenerProfesor(id: number) {
        try {
        const profesorFind = await this.dataSource
            .getRepository(ProfesoresEntity)
            .findOne({
            where: { id: id },
            relations: ['grupos'],
            select: ['id', 'nombreCompleto', 'usuario'],
            });
        if (!profesorFind) {
            return new HttpException(
            'No se encontro el profesor',
            HttpStatus.NOT_FOUND,
            );
        }
        return profesorFind;
        } catch (error) {
        throw new HttpException(
            'Error al obtener el profesor',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async agregarProfesor(profesorBase: profesoresDto) {
        try {
        const nuevoProfesor = await this.dataSource
            .getRepository(ProfesoresEntity)
            .create(profesorBase);

        const encryptedPassword = await this.encryptPassword(
            profesorBase.password,
        );
        nuevoProfesor.password = encryptedPassword;

        return await this.dataSource
            .getRepository(ProfesoresEntity)
            .save(nuevoProfesor);
        } catch (error) {
        throw new HttpException(
            'Error al agregar el profesor',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async encryptPassword(password: string): Promise<string> {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async eliminarProfesor(id: number) {
        try {
        const profesorFind = await this.dataSource
            .getRepository(ProfesoresEntity)
            .findOne({ where: { id: id } });
        if (!profesorFind) {
            return new HttpException(
            'No se encontro el profesor',
            HttpStatus.NOT_FOUND,
            );
        }
        return await this.dataSource
            .getRepository(ProfesoresEntity)
            .remove(profesorFind);
        } catch (error) {
        throw new HttpException(
            'Error al eliminar el profesor',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async actualizarProfesor(id: number, profesorBase: profesoresDto) {
        try {
        const profesorFind = await this.dataSource
            .getRepository(ProfesoresEntity)
            .findOne({ where: { id: id } });
        if (!profesorFind) {
            return new HttpException(
            'No se encontro el profesor',
            HttpStatus.NOT_FOUND,
            );
        }
        return await this.dataSource
            .getRepository(ProfesoresEntity)
            .update({ id: profesorFind.id }, profesorBase);
        } catch (error) {
        throw new HttpException(
            'Error al actualizar el profesor',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

    async loginProfesor(usuario: string, password: string) {
        try {
        const profesorFind = await this.dataSource
            .getRepository(ProfesoresEntity)
            .findOne({
            where: { usuario: usuario },
            relations: ['grupos'],
            select: ['id', 'nombreCompleto', 'usuario', 'password'],
            });

        if (!profesorFind) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        const bcrypt = require('bcrypt');
        const isPasswordValid = await bcrypt.compare(
            password,
            profesorFind.password,
        );

        if (!isPasswordValid) {
            throw new HttpException(
            'Contraseña incorrecta',
            HttpStatus.UNAUTHORIZED,
            );
        }

        // Si la contraseña es válida, devolver la información completa del usuario
        return {
            id: profesorFind.id,
            nombreCompleto: profesorFind.nombreCompleto,
            usuario: profesorFind.usuario,
            grupos: profesorFind.grupos,
        };
        } catch (error) {
        throw new HttpException(
            'Error al iniciar sesión',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
}
