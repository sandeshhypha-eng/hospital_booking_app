import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() body: any) {
    return this.bookingService.createBooking(body);
  }

  @Get('slots')
  async getSlots(
    @Query('tenantId') tenantId: string,
    @Query('serviceId') serviceId: string,
    @Query('date') date: string,
  ) {
    return this.bookingService.getAvailableSlots(tenantId, serviceId, date);
  }

  @Get()
  async findAll(@Query('tenantId') tenantId: string) {
    return this.bookingService.findByTenant(tenantId);
  }
}
