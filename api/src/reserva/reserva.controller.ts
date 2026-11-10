import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaDto } from './dto/reserva.dto';

@Controller('reserva')
export class ReservaController {

  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  getAllReservas() {
    return this.reservaService.getAllReservas();
  }

  @Get(':id')
  async getReservaById(@Param('id', ParseIntPipe) id: number) {
    const reserva = await this.reservaService.getReservaById(id);
    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }
    return reserva;
  }

  @Post()
  async createReserva(@Body() data: ReservaDto) {
    return this.reservaService.createReserva(data);
  }

  @Post('devolver/:id')
  async devolverReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.devolverReserva(id);
  }
}
