import { Module } from '@nestjs/common';
import { BookingController } from './modules/booking/booking.controller';
import { BookingService } from './modules/booking/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './modules/booking/booking.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'booking_platform',
      entities: [Booking],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Booking]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class AppModule {}
