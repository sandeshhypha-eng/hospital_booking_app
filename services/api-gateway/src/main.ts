import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Booking Platform API')
    .setDescription('The API Gateway for all services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const server = await app.listen(3000);

  // Handle WebSocket upgrades
  const queueProxy = createProxyMiddleware('/queue', {
    target: 'http://localhost:3004',
    changeOrigin: true,
    ws: true,
  });

  server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/queue')) {
      (queueProxy as any).upgrade(req, socket, head);
    }
  });

  console.log(`API Gateway is running on: 3000`);
}
bootstrap();
