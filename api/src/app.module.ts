import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LivroModule } from "./livro/livro.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsuarioModule } from './usuario/usuario.module';
import { ReservaModule } from './reserva/reserva.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LivroModule, 
    PrismaModule, 
    UsuarioModule, 
    ReservaModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
