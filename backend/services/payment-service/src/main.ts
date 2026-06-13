import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4006;
  await app.listen(port);
  console.log(`Payment Service is running on: ${port}`);
}
bootstrap();
