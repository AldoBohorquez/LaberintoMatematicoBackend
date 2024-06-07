import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { EjerciciosDto } from './dto/ejercicios.dto';

@Controller('ejercicios')
export class EjerciciosController {

    constructor(private service: EjerciciosService) {}

    @Get()
    obtenerEjercicios() {
        return this.service.obtenerEjercicios();
    }

    @Get(':id')
    obtenerEjercicio(@Param('id') id: number) {
        return this.service.obtenerEjercicio(id);
    }

    @Get('nivelName/:name')
    obtenerEjerciciosNivel(@Param('name') name: string) {
        return this.service.obtenerEjerciciosNivel(name);
    }

    @Post()
    agregarEjercicio(@Body() bodyEjercicio:EjerciciosDto) {
        return this.service.agregarEjercicio(bodyEjercicio);
    }

    @Delete(':id')
    eliminarEjercicio(@Param('id') id: number) {
        return this.service.eliminarEjercicio(id);
    }

    @Put(':id')
    actualizarEjercicio(@Param('id') id: number, @Body() bodyEjercicio:EjerciciosDto) {
        return this.service.actualizarEjercicio(id, bodyEjercicio);
    }

}
