import { Module } from '@nestjs/common';
import { QueueService } from './modules/queue/queue.service';
import { QueueGateway } from './modules/queue/queue.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [QueueService, QueueGateway],
})
export class AppModule {}
