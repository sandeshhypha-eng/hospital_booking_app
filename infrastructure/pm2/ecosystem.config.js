module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: 'services/api-gateway/dist/main.js',
      env: { PORT: 3000 }
    },
    {
      name: 'auth-service',
      script: 'services/auth-service/dist/main.js',
      env: { PORT: 3001 }
    },
    {
      name: 'business-service',
      script: 'services/business-service/dist/main.js',
      env: { PORT: 3002 }
    },
    {
      name: 'booking-service',
      script: 'services/booking-service/dist/main.js',
      env: { PORT: 3003 }
    },
    {
      name: 'queue-service',
      script: 'services/queue-service/dist/main.js',
      env: { PORT: 3004 }
    }
  ]
};
