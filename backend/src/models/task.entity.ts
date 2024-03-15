import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from './collection.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  constructor(name: string, description: string, isDone: boolean, user: User) {
    this.name = name;
    this.description = description;
    this.isDone = isDone;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => Collection, (collection) => collection.tasks, {
    onDelete: 'CASCADE',
  })
  collection: Collection;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
