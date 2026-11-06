import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LivroDto } from "./livro.dto";

@Injectable()
export class LivroService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllLivros() {
    return this.prismaService.livro.findMany();
  }

	//async getAllLivros() {
	//	const livros = await this.prismaService.livro.findMany();

	//	return livros.map((livro) => ({
	//		id: livro.id,
	//		descricao: `${livro.titulo} — ${livro.autor}`,
	//	}));
	//}

	async getLivroById(id: number) {
    return this.prismaService.livro.findUnique({
      where: { id },
    });
  }

  async deleteLivro(id: number) {
    return this.prismaService.livro.delete({
      where: { id },
    });
  }

	async createLivro(data: LivroDto) {
		return this.prismaService.livro.create({
			data: {
				titulo: data.titulo,
				autor: data.autor,
				anoPublicacao: data.anoPublicacao,
				genero: data.genero,
			},
		});
	}

}
