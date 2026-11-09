import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UsuarioDto {

  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  nome: string;

  @IsEmail({}, { message: "O email deve ser válido" })
  @IsString({ message: "O email deve ser uma string" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  email: string;

  @IsString({ message: "A senha deve ser uma string" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  @MaxLength(64, { message: "A senha deve ter no máximo 64 caracteres" })
  senha: string;
}

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}