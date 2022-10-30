import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  data: string;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
