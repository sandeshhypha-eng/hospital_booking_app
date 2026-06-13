module.exports = {
  apps: [
    // Go Services
    {
      name: 'api-gateway',
      script: './main',
      cwd: './backend/services/go-services/api-gateway',
      interpreter: 'none',
      env: {
        PORT: 3000,
        JWT_SECRET: process.env.JWT_SECRET || 'change-me-local-dev',
      }
    },
    {
      name: 'queue-service',
      script: './main',
      cwd: './backend/services/go-services/queue-service',
      interpreter: 'none',
      env: {
        PORT: 4003,
        DATABASE_URL: 'host=localhost user=admin password=password dbname=booking_platform port=5432 sslmode=disable',
        REDIS_URL: 'localhost:6379',
        RABBITMQ_URL: 'amqp://guest:guest@localhost:5672/',
      }
    },
    {
      name: 'websocket-hub',
      script: './main',
      cwd: './backend/services/go-services/websocket-hub',
      interpreter: 'none',
      env: {
        PORT: 4010,
        REDIS_URL: 'localhost:6379',
      }
    },
    // NestJS Services
    {
      name: 'auth-service',
      script: 'npm run start:prod',
      cwd: './backend/services/auth-service',
      env: {
        PORT: 4001,
        DATABASE_URL: 'postgresql://admin:password@localhost:5432/booking_platform?schema=auth',
      }
    },
    {
      name: 'booking-service',
      script: 'npm run start:prod',
      cwd: './backend/services/booking-service',
      env: {
        PORT: 4002,
        DATABASE_URL: 'postgresql://admin:password@localhost:5432/booking_platform',
        RABBITMQ_URL: 'amqp://localhost:5672',
      }
    },
    {
      name: 'business-service',
      script: 'npm run start:prod',
      cwd: './backend/services/business-service',
      env: {
        PORT: 4008,
        DATABASE_URL: 'postgresql://admin:password@localhost:5432/booking_platform',
      }
    },
    {
      name: 'file-service',
      script: 'npm run start:prod',
      cwd: './backend/services/file-service',
      env: {
        PORT: 4004,
      }
    },
    {
      name: 'notification-service',
      script: 'npm run start:prod',
      cwd: './backend/services/notification-service',
      env: {
        PORT: 4005,
        RABBITMQ_URL: 'amqp://guest:guest@localhost:5672',
      }
    },
    {
      name: 'payment-service',
      script: 'npm run start:prod',
      cwd: './backend/services/payment-service',
      env: {
        PORT: 4006,
      }
    },
    {
      name: 'user-service',
      script: 'npm run start:prod',
      cwd: './backend/services/user-service',
      env: {
        PORT: 4007,
      }
    }
  ]
};
