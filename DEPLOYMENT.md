# Production Deployment Guide

## Prerequisites
- Ubuntu 22.04 LTS
- Node.js 20+
- PostgreSQL 15
- Redis 7
- RabbitMQ 3.12+
- PM2 (`npm install -g pm2`)
- Nginx

## Setup Instructions

### 1. Database & Infrastructure
Install and configure PostgreSQL, Redis, and RabbitMQ. Create the main database `booking_platform`.

### 2. Microservices Setup
For each service in `services/`:
1. `npm install`
2. `npm run build`
3. Configure `.env` with DB and Redis credentials.

### 3. PM2 Process Management
Use the provided `ecosystem.config.js` to start all services:
```bash
pm2 start ecosystem.config.js
```

### 4. Nginx Gateway
Copy `infrastructure/nginx/nginx.conf` to `/etc/nginx/nginx.conf` and restart Nginx.

## CI/CD (GitHub Actions)
Example workflow in `.github/workflows/deploy.yml`.
