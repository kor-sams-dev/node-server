import { Module } from '@nestjs/common';
import { CatsService } from './cat.service';
import { ProviderCatsController } from './cat.controller.spec';

@Module({
  controllers: [ProviderCatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatModule {}
