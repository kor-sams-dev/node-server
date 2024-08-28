import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller.spec';
import { CatModule } from './cat/cat.module';
import { CatsService } from './cat/cat.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { LoggerMiddleware } from './logger.middleware.ts';

@Module({
  imports: [CatModule],
  controllers: [AppController, CatController],
  providers: [
    AppService,
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // 모듈에서 사용할 필터를 설정.
    },
  ],
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
