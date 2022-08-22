import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  like: number;

  @Column({ type: 'enum', default: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE'] })
  status: string;
}
