import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'notification_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.startAllMicroservices();
  const port = process.env.PORT || 4005;
  await app.listen(port);
  console.log(`Notification Service is running on: ${port} and listening via RabbitMQ`);
}
bootstrap();
