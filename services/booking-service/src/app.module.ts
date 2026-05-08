import { Module } from '@nestjs/common';
import { BookingController } from './modules/booking/booking.controller';
import { BookingService } from './modules/booking/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './modules/booking/booking.entity';

@Module({
  imports: [
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
