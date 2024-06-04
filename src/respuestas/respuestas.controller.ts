import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { respuestasDto } from './dto/respuestas.dto';

@Controller('respuestas')
export class RespuestasController {

    constructor(private service: RespuestasService) {
    }

    @Get()
    obtenerRespuestas() {
        return this.service.getRespuestas();
    }
    @Get(':id')
    obtenerRespuesta(@Param('id') id: number) {
        return this.service.getREspuesta(id);
    }

    @Post()
    agregarRespuesta(@Body() bodyResp:respuestasDto) {
        return this.service.addRespuestas(bodyResp);
    }
    @Put(':id')
    updateRespuesta(@Param('id') id: number, @Body() bodyResp:respuestasDto) {
        return this.service.updateRespuesta(id, bodyResp);
    }

    @Delete(':id')
    deleyteRespuesta(@Param('id') id: number) {
        return this.service.deleteRespuesta(id);
    }

}
