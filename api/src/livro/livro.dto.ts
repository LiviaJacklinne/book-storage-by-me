import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GeneroEnum } from "../../generated/prisma/enums";
import { PartialType } from '@nestjs/mapped-types';


export class LivroDto {

  @IsString({ message: "O título deve ser uma string" })
  @IsNotEmpty({ message: "O título não pode ser vazio" })
  titulo: string;

  @IsString({ message: "O autor deve ser uma string" })
  @IsNotEmpty({ message: "O autor não pode ser vazio" })
  autor: string;

  @IsOptional()
  @IsInt({ message: "O ano de publicação deve ser um número inteiro" })
  anoPublicacao: number;

  @IsEnum(GeneroEnum, { message: "Gênero inválido" })
  genero: GeneroEnum;

  @IsNotEmpty({ message: "A quantidade disponível não pode ser vazia" })
  qtdDisponivel: number;
}

export class UpdateLivroDto extends PartialType(LivroDto) {}
