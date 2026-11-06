import { Module } from "@nestjs/common";
import { LivroController } from "./livro.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { LivroService } from "./livro.service";

@Module({
  controllers: [LivroController],
  imports: [PrismaModule],
  providers: [LivroService],
})
export class LivroModule {}
