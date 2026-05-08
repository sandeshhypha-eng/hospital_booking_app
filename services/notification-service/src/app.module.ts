import { Module } from '@nestjs/common';
import { NotificationController } from './modules/notification/notification.controller';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [],
})
export class AppModule {}
