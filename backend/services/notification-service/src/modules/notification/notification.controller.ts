import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @EventPattern('booking_created')
  async handleBookingCreated(@Payload() data: any) {
    console.log('Received booking_created event:', data);
    // Logic to send push notification, email, etc.
    return { status: 'success' };
  }
}
