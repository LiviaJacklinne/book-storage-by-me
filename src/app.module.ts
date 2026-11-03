import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivroService } from './livro/livro.service';
import { LivroModule } from './livro/livro.module';

@Module({
  imports: [LivroModule],
  controllers: [AppController],
  providers: [AppService, LivroService],
})
export class AppModule {}
