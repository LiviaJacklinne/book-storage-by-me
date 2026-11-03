import { IsIn } from "class-validator";
import { GeneroEnum } from "./livro.enum";

export class LivroDto {

    id: number;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    genero: GeneroEnum;
}