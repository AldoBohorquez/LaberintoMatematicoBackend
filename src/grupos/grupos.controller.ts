import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposDto } from './dto/grupos.dto';

@Controller('grupos')
export class GruposController {

    constructor(private service: GruposService) {}

    @Get()
    obtenerGrupos() {
        return this.service.obtenerGrupos();
    }

    @Get('profesor/:id')
    getGruposByProfesor(@Param('id') id: number) {
        return this.service.getGruposByProfesor(id);
    }

    @Get(':id')

    obtenerGrupo(@Param('id') id: number) {
        return this.service.obtenerGrupo(id);
    }

    @Post()
    agregarGrupo(@Body() grupoBase: GruposDto) {
        return this.service.agregarGrupo(grupoBase);
    }

    @Delete(':id')

    eliminarGrupo(@Param('id') id: number) {
        return this.service.eliminarGrupo(id);
    }

    @Put(':id')
    actualizarGrupo(@Param('id') id: number, @Body() body: { nombre: string }) {
        return this.service.actualizarGrupo(id, body.nombre);
    }
    
}
