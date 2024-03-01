import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from "./Collection";
import { Task } from "./Task";


@Entity()
export class User extends BaseEntity{

	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column()
		email: string;
	
	@Column()
		password: string;

	@OneToMany(() => Collection, collection => collection.user)
		collections: Collection[];

	@OneToMany(() => Task, task => task.user)
		tasks: Task[];

}
