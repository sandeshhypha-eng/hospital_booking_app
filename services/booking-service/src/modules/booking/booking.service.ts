import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}

  async createBooking(data: Partial<Booking>) {
    const booking = this.bookingRepository.create(data);
    const savedBooking = await this.bookingRepository.save(booking);

    // Emit event to RabbitMQ
    this.client.emit('booking_created', savedBooking);

    return savedBooking;
  }

  async getAvailableSlots(tenantId: string, serviceId: string, date: string) {
    // Mock logic for slots
    return [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
    ];
  }

  async findByTenant(tenantId: string) {
    return this.bookingRepository.find({ where: { tenantId } });
  }
}
