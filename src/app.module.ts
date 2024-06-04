import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { GruposModule } from './grupos/grupos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { PuntuacionesModule } from './puntuaciones/puntuaciones.module';
import { NivelesModule } from './niveles/niveles.module';
import { SalasModule } from './salas/salas.module';
import { AlumnosController } from './alumnos/alumnos.controller';
import { AlumnosService } from './alumnos/alumnos.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosEntity } from './alumnos/entity/alumnos.entity';
import { EjerciciosEntity } from './ejercicios/entity/ejercicios.entity';
import { GruposEntity } from './grupos/entity/grupos.entity';
import { NivelesEntity } from './niveles/entity/niveles.entity';
import { ProfesoresEntity } from './profesores/entity/profesores.entity';
import { PuntuacionesEntity } from './puntuaciones/entity/puntuaciones.entity';
import { SalasEntity } from './salas/entity/salas.entity';
import { RespuestasModule } from './respuestas/respuestas.module';
import { respuestasEntity } from './respuestas/entity/respuestas.entity';
import { EjerciciosController } from './ejercicios/ejercicios.controller';
import { GruposController } from './grupos/grupos.controller';
import { NivelesController } from './niveles/niveles.controller';
import { ProfesoresController } from './profesores/profesores.controller';
import { PuntuacionesController } from './puntuaciones/puntuaciones.controller';
import { SalasController } from './salas/salas.controller';
import { RespuestasController } from './respuestas/respuestas.controller';
import { EjerciciosService } from './ejercicios/ejercicios.service';
import { GruposService } from './grupos/grupos.service';
import { NivelesService } from './niveles/niveles.service';
import { ProfesoresService } from './profesores/profesores.service';
import { PuntuacionesService } from './puntuaciones/puntuaciones.service';
import { SalasService } from './salas/salas.service';
import { RespuestasService } from './respuestas/respuestas.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "dpg-cpfpmo0l5elc738hdk0g-a",
    port: 5432,
    username: "admin",
    password: "tKGnrn3Unr4a0A4i67Z2NmVJEtT76xpb",
    database: "labmat_kzir",
    synchronize: true,
    logging: true,
    entities: [AlumnosEntity, EjerciciosEntity, GruposEntity, NivelesEntity, ProfesoresEntity, PuntuacionesEntity, SalasEntity,respuestasEntity],
    subscribers: [],
    migrations: [],
  })
    ,EjerciciosModule, GruposModule, ProfesoresModule, PuntuacionesModule, NivelesModule, SalasModule, AlumnosModule, RespuestasModule],
  controllers: [AppController, AlumnosController,EjerciciosController,GruposController,NivelesController,ProfesoresController,PuntuacionesController,SalasController,RespuestasController],
  providers: [AppService, AlumnosService,EjerciciosService,GruposService,NivelesService,ProfesoresService,PuntuacionesService,SalasService,RespuestasService],
})
export class AppModule {}
