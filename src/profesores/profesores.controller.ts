import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { profesoresDto } from './dto/profesores.dto';
import { profesoreLoginDto } from './dto/profesoresSalida.dto';

@Controller('profesores')
export class ProfesoresController {

    constructor(private service: ProfesoresService) {}

    @Get()
    obtenerProfesores() {
        return this.service.obtenerProfesores();
    }

    @Post('/login')
    login(@Body() profesorBase:profesoreLoginDto)
    {
        return this.service.loginProfesor(profesorBase.usuario,profesorBase.password);
    }


    
    @Get(':id')
    obtenerProfesor(@Param('id') id:number)
    {
        return this.service.obtenerProfesor(id);
    }

    @Post()
    agregarProfesor(@Body() profesorBase:profesoresDto)
    {
        return this.service.agregarProfesor(profesorBase);
    }

    @Delete(':id')
    eliminarProfesor(@Param('id') id:number)
    {
        return this.service.eliminarProfesor(id);
    }

    @Put(':id')
    actualizarProfesor(@Param('id') id:number,@Body() profesorBase:profesoresDto)
    {
        return this.service.actualizarProfesor(id,profesorBase);
    }


}
