import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class QueueGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinQueue')
  handleJoinQueue(@MessageBody() data: { tenantId: string, businessId: string }) {
    // Logic to join a socket room for real-time updates
    return { event: 'joined', data };
  }

  broadcastQueueUpdate(tenantId: string, businessId: string, newToken: number) {
    this.server.to(`${tenantId}:${businessId}`).emit('queueUpdate', { newToken });
  }
}
