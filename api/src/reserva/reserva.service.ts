import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
      throw new NotFoundException(`Reserva com ID ${id} não encontrada`);
    }

    return {
      id: reserva.id,
      descricao: `Reserva do livro "${reserva.livro.titulo}" pelo usuário "${reserva.usuario.nome}"`,
      autor: reserva.livro.autor,
      dataReserva: reserva.dataReserva,
      dataDevolucao: reserva.dataDevolucao,
      status: reserva.status,
    };
  }

  async createReserva(data: any) {

    const usuario = await this.prismaService.usuario.findUnique({
      where: { id: data.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${data.usuarioId} não encontrado`);
    }

    const livro = await this.prismaService.livro.findUnique({
      where: { id: data.livroId },
    });

    if (!livro) {
      throw new NotFoundException(`Livro com ID ${data.livroId} não encontrado`);
    }
    if (livro.qtdDisponivel <= 0) {
      throw new NotFoundException(`Livro "${livro.titulo}" não está disponível para reserva`);
    }

    this.prismaService.livro.update({
      where: { id: data.livroId },
      data: {
        qtdDisponivel: livro.qtdDisponivel - 1,
      },
    });

    return this.prismaService.reservaLivro.create({
      data: {
        id_usuario: data.usuarioId,
        id_livro: data.livroId,
        dataReserva: data.dataReserva,
        dataDevolucao: data.dataDevolucao,
      },
    });
  }
}
