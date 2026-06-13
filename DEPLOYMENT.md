# Production Deployment Guide

## 1. Server Preparation (Ubuntu 22.04+)

### Install Dependencies
```bash
sudo apt update
sudo apt install -y nginx postgresql redis-server rabbitmq-server nodejs npm golang-go
sudo npm install -g pm2
```

### Linux Performance Tuning
Edit `/etc/sysctl.conf`:
```
fs.file-max = 2097152
net.core.somaxconn = 65535
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_fin_timeout = 30
net.ipv4.tcp_keepalive_time = 1200
```
Apply with `sudo sysctl -p`.

## 2. Database Setup

```sql
CREATE DATABASE booking_platform;
-- Services use different schemas (auth, booking, queue, etc.)
```

## 3. Application Build

### Install Dependencies
```bash
npm install
npm run prisma:generate
```

### Build Go Services
```bash
cd backend/services/go-services/api-gateway && go build -o main && cd ../../../..
cd backend/services/go-services/queue-service && go build -o main && cd ../../../..
cd backend/services/go-services/websocket-hub && go build -o main && cd ../../../..
```

### Build NestJS Services
```bash
npm run build:all
```

## Active Service Map

| Service | Runtime | Port |
| --- | --- | --- |
| API Gateway | Go/Fiber | 3000 |
| Auth Service | NestJS | 4001 |
| Booking Service | NestJS | 4002 |
| Queue Service | Go/Fiber | 4003 |
| File Service | NestJS | 4004 |
| Notification Service | NestJS + RabbitMQ | 4005 |
| Payment Service | NestJS | 4006 |
| User Service | NestJS | 4007 |
| Business Service | NestJS | 4008 |
| WebSocket Hub | Go/Fiber | 4010 |

The active gateway and queue services are the Go implementations under `backend/services/go-services`. The older NestJS `backend/services/api-gateway` and `backend/services/queue-service` directories are retained for reference but are excluded from active npm workspaces and PM2 runtime.

## 4. Deployment with PM2

```bash
pm2 start infrastructure/pm2/ecosystem.config.js
pm2 save
pm2 startup
```

## 5. Nginx Configuration

```bash
sudo cp infrastructure/nginx/production.conf /etc/nginx/sites-available/booking-platform
sudo ln -s /etc/nginx/sites-available/booking-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 7. Monitoring

- Use `pm2 monit` for real-time process monitoring.
- Check logs: `pm2 logs`.
- Nginx logs: `/var/log/nginx/access.log` and `error.log`.
