import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(data: Partial<Booking>) {
    const booking = this.bookingRepository.create(data);
    return this.bookingRepository.save(booking);
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
