import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosDto } from './dto/alumnos.dto';
import { AlumnosLoginDto } from './dto/alumnosLogin.dto';

@Controller('alumnos')
export class AlumnosController {

    constructor(private service: AlumnosService) {}

    @Get()
    obtenerAlumnos() {
        return this.service.obtenerAlumnos();
    }

    @Get(':id')
    obtenerAlumno(@Param('id') id: number) {
        return this.service.obtenerAlumno(id);
    }

    @Get('puntuaciones/alumno/:id')
    obtenerPuntuacionesAlumno(@Param('id') id: number) {
        return this.service.obtenerPuntuacionesAlumno(id);
    }

    @Post()
    agregarAlumno(@Body() body:AlumnosDto) {
        return this.service.agregarAlumno(body);
    }

    @Post('login')
    loginAlumno(@Body() body:AlumnosLoginDto) {
        return this.service.loginAlumno( body.estudianteId, body.grupoId );
    }

    @Put(':id')
    actualizarAlumno(@Param('id') id: number, @Body() body:{nombre: string}) {
        return this.service.actualizarAlumno(id, body.nombre);
    }

    @Delete(':id')
    eliminarAlumno(@Param('id') id: number) {
        return this.service.eliminarAlumno(id);
    }
}
