import { Module } from '@nestjs/common';
import { BusinessService } from './modules/business/business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './modules/business/business.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'booking_platform',
      entities: [Business],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([Business]),
  ],
  controllers: [],
  providers: [BusinessService],
})
export class AppModule {}
