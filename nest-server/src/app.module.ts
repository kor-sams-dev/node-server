import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller.spec';
import { CatModule } from './cat/cat.module';
import { CatsService } from './cat/cat.service';
import { LoggerMiddleware } from './logger.middleware.ts';

@Module({
  imports: [CatModule],
  controllers: [AppController, CatController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(CatController);
    consumer
      // .apply(logger) // Functional middleware
      // .apply(cores(), helmet(), logger) // Multiple middleware
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cat', method: RequestMethod.PUT },
        { path: 'cat', method: RequestMethod.POST },
        'cat/(.*)',
      )
      .forRoutes({ path: 'cat', method: RequestMethod.GET });
  }
}
