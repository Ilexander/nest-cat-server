/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './guard/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.useGlobalGuards(new RolesGuard());
  await app.listen(3001);
}
bootstrap();
