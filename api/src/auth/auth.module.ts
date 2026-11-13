import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsuarioModule],
})
export class AuthModule {}
