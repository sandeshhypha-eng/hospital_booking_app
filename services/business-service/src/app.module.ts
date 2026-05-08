import { Module } from '@nestjs/common';
import { BusinessService } from './modules/business/business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './modules/business/business.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'booking_platform',
      entities: [Business],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Business]),
  ],
  controllers: [],
  providers: [BusinessService],
})
export class AppModule {}
