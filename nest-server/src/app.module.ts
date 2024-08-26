import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller.spec';
import { CatsService } from './cat/cat.service';

@Module({
  imports: [],
  controllers: [AppController, CatController],
  providers: [AppService, CatsService],
})
export class AppModule {}
