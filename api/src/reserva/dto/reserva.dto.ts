import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ReservaStatusEnum } from "../../../generated/prisma/enums";

export class ReservaDto {
  @IsNotEmpty({ message: "O ID do usuário é obrigatório" })
  @IsInt({ message: "O ID do usuário deve ser um número inteiro" })
  id_usuario: number;

  @IsNotEmpty({ message: "O ID do livro é obrigatório" })
  @IsInt({ message: "O ID do livro deve ser um número inteiro" })
  id_livro: number;

  @IsEnum(ReservaStatusEnum)
  @IsOptional()
  status?: ReservaStatusEnum;

  @IsDateString()
  @IsOptional()
  dataReserva?: Date;

  @IsDateString()
  @IsOptional()
  dataDevolucao?: Date;
}