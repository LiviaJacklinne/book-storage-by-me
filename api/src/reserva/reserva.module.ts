import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService],
  imports: [PrismaModule],
})
export class ReservaModule {}
