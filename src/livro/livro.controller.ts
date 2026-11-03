import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { LivroService } from "./livro.service";
import { LivroDto } from "./livro.dto";

@Controller("livro")
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Get()
  listar() {
    return this.livroService.getAllLivros();
  }

  @Get(":id")
  async buscarPorId(@Param("id", ParseIntPipe) id: number) {
    const livro = await this.livroService.getLivroById(id);
    if (!livro) {
      throw new NotFoundException("Livro não encontrado");
    }
    return livro;
  }

  @Delete(":id")
  async deletar(@Param("id", ParseIntPipe) id: number) {
    const livro = await this.livroService.getLivroById(id);
    if (!livro) {
      throw new NotFoundException("Livro não encontrado");
    }
    return this.livroService.deleteLivro(id);
  }

  @Post()
  async criar(@Body() data: LivroDto) {
    return this.livroService.createLivro(data);
  }
}
