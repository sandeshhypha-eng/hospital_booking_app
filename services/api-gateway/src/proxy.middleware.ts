import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const proxyOptions = {
      '/auth': { target: 'http://localhost:3001', changeOrigin: true },
      '/business': { target: 'http://localhost:3002', changeOrigin: true },
      '/bookings': { target: 'http://localhost:3003', changeOrigin: true },
      '/queue': { target: 'http://localhost:3004', changeOrigin: true },
    };

    const path = req.url.split('/')[1];
    const option = proxyOptions[`/${path}`];

    if (option) {
      return createProxyMiddleware(option)(req, res, next);
    }
    next();
  }
}
