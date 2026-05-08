import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class QueueService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: 6379,
    });
  }

  async generateToken(tenantId: string, businessId: string) {
    const key = `queue:${tenantId}:${businessId}`;
    const token = await this.redis.incr(key);
    return { token, estimatedWaitTime: token * 10 }; // 10 mins per token
  }

  async getCurrentQueue(tenantId: string, businessId: string) {
    const key = `queue:${tenantId}:${businessId}`;
    const current = await this.redis.get(key);
    return { current: parseInt(current || '0') };
  }
}
