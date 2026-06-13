import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @Get('health')
  health() {
    return { status: 'ok', service: 'notification-service' };
  }

  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() data: any) {
    console.log('Received booking_created event:', data);
    // Logic to send push notification, email, etc.
    return { status: 'success' };
  }
}
