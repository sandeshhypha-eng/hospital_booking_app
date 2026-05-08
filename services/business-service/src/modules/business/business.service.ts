import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  findAll() {
    return this.businessRepository.find();
  }

  findByTenant(tenantId: string) {
    return this.businessRepository.findOne({ where: { tenantId } });
  }

  create(business: Partial<Business>) {
    return this.businessRepository.save(business);
  }
}
