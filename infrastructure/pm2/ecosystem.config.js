module.exports = {
  apps: [
    // Go Services
    {
      name: 'api-gateway',
      script: './go-services/api-gateway/main',
      cwd: './go-services/api-gateway',
      interpreter: 'none',
      env: {
        PORT: 3000,
        JWT_SECRET: 'secret',
      }
    },
    {
      name: 'queue-service',
      script: './go-services/queue-service/main',
      cwd: './go-services/queue-service',
      interpreter: 'none',
      env: {
        DATABASE_URL: 'host=localhost user=admin password=password dbname=booking_platform port=5432 sslmode=disable',
        REDIS_URL: 'localhost:6379',
        RABBITMQ_URL: 'amqp://guest:guest@localhost:5672/',
      }
    },
    {
      name: 'websocket-hub',
      script: './go-services/websocket-hub/main',
      cwd: './go-services/websocket-hub',
      interpreter: 'none',
      env: {
        REDIS_URL: 'localhost:6379',
      }
    },
    // NestJS Services
    {
      name: 'auth-service',
      script: 'npm run start:prod',
      cwd: './services/auth-service',
      env: {
        PORT: 4001,
        DATABASE_URL: 'postgresql://admin:password@localhost:5432/booking_platform?schema=auth',
      }
    },
    {
      name: 'booking-service',
      script: 'npm run start:prod',
      cwd: './services/booking-service',
      env: {
        PORT: 4002,
        DATABASE_URL: 'postgresql://admin:password@localhost:5432/booking_platform?schema=booking',
        RABBITMQ_URL: 'amqp://localhost:5672',
      }
    },
    {
      name: 'file-service',
      script: 'npm run start:prod',
      cwd: './services/file-service',
      env: {
        PORT: 4004,
      }
    },
    {
      name: 'notification-service',
      script: 'npm run start:prod',
      cwd: './services/notification-service',
      env: {
        PORT: 4005,
        RABBITMQ_URL: 'amqp://guest:guest@localhost:5672',
      }
    },
    {
      name: 'payment-service',
      script: 'npm run start:prod',
      cwd: './services/payment-service',
      env: {
        PORT: 4006,
      }
    },
    {
      name: 'user-service',
      script: 'npm run start:prod',
      cwd: './services/user-service',
      env: {
        PORT: 4007,
      }
    }
  ]
};
