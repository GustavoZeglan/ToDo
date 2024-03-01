import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";


@Entity()
export class Collection {

	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column()
		image: string;

	@Column()
		color: string;	

	@OneToMany(() => Task, task => task.collection)
		tasks: Task[];

	@ManyToOne(() => User, user => user.collections)
		user: User;
		
}