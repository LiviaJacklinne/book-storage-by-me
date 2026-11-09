import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto, UsuarioDto } from './dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: UsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuarioService.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.usuarioService.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const usuario = this.usuarioService.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return this.usuarioService.remove(id);
  }
}
