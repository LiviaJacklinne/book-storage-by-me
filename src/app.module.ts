import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LivroService } from "./livro/livro.service";
import { LivroModule } from "./livro/livro.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [LivroModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, LivroService],
})
export class AppModule {}
