import { IsInt, IsNotEmpty } from "class-validator";

export class ReservaDto {

  @IsNotEmpty({ message: "O ID do livro é obrigatório" })
  @IsInt({ message: "O ID do livro deve ser um número inteiro" })
  id_livro: number;

}