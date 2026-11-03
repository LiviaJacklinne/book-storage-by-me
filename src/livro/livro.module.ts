import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';

@Module({
  controllers: [LivroController]
})
export class LivroModule {}
