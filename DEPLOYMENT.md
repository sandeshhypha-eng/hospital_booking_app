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

### Build Go Services
```bash
cd go-services/api-gateway && go build -o main
cd ../queue-service && go build -o main
cd ../websocket-hub && go build -o main
```

### Build NestJS Services
```bash
cd services/auth-service && npm install && npm run build
-- Repeat for all NestJS services
```

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
