import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { SalasService } from './salas.service';
import { salasDto } from './dto/salas.dto';
import { activarSalasDto } from './dto/activarSalas.dto';

@Controller('salas')
export class SalasController {
    constructor(private service: SalasService) { }

    @Get()
    obtenerSalas() {
        return this.service.obtenerSalas();
    }

    @Get(':id')
    obtenerSala(@Param('id') id: number) {
        return this.service.obtenerSala(id);
    }

    @Post()
    agregarSala(@Body() bodySala: salasDto) {
        return this.service.agregarSala(bodySala);
    }

    @Delete(':id')
    eliminarSala(@Param('id') id: number) {
        return this.service.eliminarSala(id);
    }

    @Put('activar')
    activarSala(@Body() activeB: activarSalasDto){
        return this.service.activarSala(activeB);
    }
}
