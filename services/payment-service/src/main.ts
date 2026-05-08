import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3006);
  console.log(`Payment Service is running on: 3006`);
}
bootstrap();
