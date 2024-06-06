import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PuntuacionesService } from './puntuaciones.service';
import { puntuacionesDto } from './dto/puntuaciones.dto';
import { PuntuacionesAluNivel } from './dto/puntacionesAluNivel';

@Controller('puntuaciones')
export class PuntuacionesController {

    constructor(private service:PuntuacionesService) {}

    @Get()
    obtenerPuntuaciones() {
        return this.service.obtenerPuntuaciones();
    }

    @Get(':id')
    obtenerPuntuacion(@Param('id') id:number)
    {
        return this.service.obtenerPuntuacion(id);
    }

    @Post()
    agregarPuntuacion(@Body() puntuacionBase:puntuacionesDto)
    {
        return this.service.agregarPuntuacion(puntuacionBase);
    }

    @Post('alumnoNivel')
    obtenerPuntuacionesAlumnoNivel(@Body() bodyPuntuaciones:PuntuacionesAluNivel)
    {
        return this.service.obtenerPuntuacionesAlumnoNivel(bodyPuntuaciones);
    }

    @Put(':id')
    actualizarPuntuacion(@Param('id') id:number,@Body() puntuacionBase:puntuacionesDto)
    {
        return this.service.actualizarPuntuacion(id,puntuacionBase);
    }
    @Delete(':id')
    eliminarPuntuacion(@Param('id') id:number)
    {
        return this.service.eliminarPuntuacion(id);
    }

}
