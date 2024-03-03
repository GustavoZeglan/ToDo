// eslint-disable-next-line prettier/prettier
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity()
export class Collection {
  constructor(name: string, image: string, color: string, user: User) {
    this.name = name;
    this.image = image;
    this.color = color;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  color: string;

  @OneToMany(() => Task, (task) => task.collection)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.collections)
  user: User;
}
