import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Global Middleware
   * Accessing the DI container in a global middleware is not possible.
   * You can use a functional middleware instead when using app.use().
   * Alternatively, you can use a class middleware and consume it with .
   * forRoutes('*') within the AppModule (or any other module).
   */
  // app.use(logger); // Global Middleware
  await app.listen(4000);
}
bootstrap();
