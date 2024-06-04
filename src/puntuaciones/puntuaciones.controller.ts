import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PuntuacionesService } from './puntuaciones.service';
import { puntuacionesDto } from './dto/puntuaciones.dto';

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

    @Delete(':id')
    eliminarPuntuacion(@Param('id') id:number)
    {
        return this.service.eliminarPuntuacion(id);
    }

}
