import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @Column()
  customerId: string;

  @Column()
  serviceId: string;

  @Column()
  slotTime: Date;

  @Column({ default: 'PENDING' })
  status: string;
}
