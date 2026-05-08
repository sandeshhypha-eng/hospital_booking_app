#!/bin/bash

# setup-local.sh - Script to run and test full app on Mac local

# 1. Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo "PM2 is required but not installed. Install with: npm install -g pm2" >&2; exit 1; }

# 2. Install dependencies
echo "Installing root and workspace dependencies..."
npm install

# 3. Start Infrastructure (DB, Redis, RabbitMQ)
echo "Starting infrastructure services..."
docker-compose up -d

# 4. Wait for Postgres to be ready
echo "Waiting for database to be ready..."
sleep 5

# 5. Initialize Auth Service (Prisma)
echo "Initializing Auth Service database..."
cd services/auth-service
npm install
npx prisma generate
# Note: In a real scenario, you'd run migrate here if DB was empty
# npx prisma migrate dev --name init
cd ../..

# 6. Build services
echo "Building all services..."
npm run build:all

# 7. Start services with PM2
echo "Starting microservices with PM2..."
pm2 start infrastructure/pm2/ecosystem.config.js

# 8. Run tests
echo "Running tests..."
npm run test:all

echo "Setup complete! App is running at http://localhost:3000 (API Gateway)"
echo "Check logs with: pm2 logs"
echo "Stop with: pm2 stop all"
