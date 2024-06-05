import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NivelesService } from './niveles.service';
import { nivelesDto } from './dto/niveles.dto';
import { ejerciciosRespDto } from './dto/ejerciciosResp.dto';

@Controller('niveles')
export class NivelesController {

    constructor(private nivelesService: NivelesService) { }

    @Get()
    async obtenerNiveles()
    {
        return await this.nivelesService.obtenerNiveles();
    }

    @Get(':id')
    async obtenerNivel(@Param('id') id:number)
    {
        return await this.nivelesService.obtenerNivel(id);
    }

    @Post('ejercicioRespuesta')
    async agregarEjercicioRespuesta(@Body() nivelBase:ejerciciosRespDto)
    {
        return await this.nivelesService.crearEjercicioRespuestas(nivelBase.nivelId,nivelBase.ejercicio,nivelBase.respuestas);
    }

    @Put(':id')
    async actualizarNivel(@Param('id') id:number,@Body() nivelBase:nivelesDto)
    {
        return await this.nivelesService.actualizarNivel(id,nivelBase);
    }

    @Post()
    async agregarNivel(@Body() nivelBase:nivelesDto)
    {
        return await this.nivelesService.agregarNivel(nivelBase);
    }

    
    @Delete(':id')
    async eliminarNivel(@Param('id') id:number)
    {
        return await this.nivelesService.eliminarNivel(id);
    }
}
