import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Tempo da reserva 5 segundos
const TEMPO_RESERVA_SEGUNDOS = 5;

@Injectable()
export class ReservaService {

  constructor(private readonly prismaService: PrismaService) {}

  async getAllReservas() {
    const reservas = await this.prismaService.reservaLivro.findMany({
      include: {
        livro: {
          select: {
            titulo: true,
          },
        },
        usuario: {
          select: {
            nome: true,
          },
        },
      },
    });

    return reservas.map((reserva) => ({
      id: reserva.id,
      descricao: `Reserva do livro "${reserva.livro.titulo}" pelo usuário "${reserva.usuario.nome}"`,
      dataReserva: reserva.dataReserva,
      dataDevolucao: reserva.dataDevolucao,
      status: reserva.status,
    }));
  }

  async getReservaById(id: number) {
    const reserva = await this.prismaService.reservaLivro.findUnique({
      where: { id },
      include: {
        livro: {
          select: {
            titulo: true,
            autor: true,
          },
        },
        usuario: {
          select: {
            nome: true,
          },
        },
      },
    });

    if (!reserva) {
      throw new BadRequestException(`Reserva com ID ${id} não encontrada`);
    }

    return {
      id: reserva.id,
      descricao: `Reserva do livro '${reserva.livro.titulo}' pelo usuário '${reserva.usuario.nome}'`,
      autor: reserva.livro.autor,
      dataReserva: reserva.dataReserva,
      dataDevolucao: reserva.dataDevolucao,
      status: reserva.status,
    };
  }

  async createReserva(data: any) {

    const usuario = await this.prismaService.usuario.findUnique({
      where: { id: data.id_usuario },
    });

    if (!usuario) {
      throw new BadRequestException(`Usuário com ID ${data.id_usuario} não encontrado`);
    }

    const dataReserva = new Date(Date.now());
    const dataDevolucao = new Date(
      dataReserva.getTime() + TEMPO_RESERVA_SEGUNDOS * 1000,
    );

    return this.prismaService.$transaction(async (tx) => {

      const livro = await tx.livro.findUnique({
        where: { id: data.id_livro },
      });

      if (!livro) {
        throw new BadRequestException(`Livro com ID ${data.id_livro} não encontrado`);
      }
      if (livro.qtdDisponivel <= 0) {
        throw new ConflictException(`Livro '${livro.titulo}' não está disponível para reserva`);
      }

      await tx.livro.update({
        where: { id: data.id_livro },
        data: { qtdDisponivel: { decrement: 1 } },
      });
    

      return tx.reservaLivro.create({
        data: {
          id_usuario: data.id_usuario,
          id_livro: data.id_livro,
          dataReserva,
          dataDevolucao,
        },
      });
    });
  }

  async devolverReserva(id: number) {
    return this.prismaService.$transaction(async (tx) => {

      const reserva = await this.prismaService.reservaLivro.findUnique({
        where: { id },
      });

      if (!reserva) {
        throw new BadRequestException(`Reserva com ID ${id} não encontrada`);
      }
      if (reserva.status === 'CONCLUIDA') {
      throw new ConflictException(
        `O livro da reserva com ID ${id} já foi devolvido`,
      );
    }

      await tx.livro.update({
        where: { id: reserva.id_livro },
        data: { qtdDisponivel: { increment: 1 } },
      });

      return tx.reservaLivro.update({
        where: { id },
        data: {
          status: 'CONCLUIDA', 
        },
      });
    });
  }
}
