import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UpdateUsuarioDto } from './dto/usuario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}
  
  //findAllUsuarios() {
  //  return this.prismaService.usuario.findMany();
  //}

  async findAllUsuarios() {
    const usuarios = await this.prismaService.usuario.findMany();

    return usuarios.map((usuario) => ({
      id: usuario.id,
      descricao: `${usuario.nome} — ${usuario.email}`,
    }));
  }

  async create(createUsuarioDto: UsuarioDto) {
    return this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
  }

  async getUsuarioById(id: number) {
    return this.prismaService.usuario.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async deleteUsuario(id: number) {
    return this.prismaService.usuario.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.usuario.findUnique({
      where: { email },
    });
  }
}
