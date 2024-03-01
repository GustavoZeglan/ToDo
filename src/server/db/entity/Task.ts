import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from "./Collection";
import { User } from "./User";


@Entity()
export class Task{

	@PrimaryGeneratedColumn()
		id: number;
	
	@Column()
		name: string;
	
	@Column()
		description: string;
	
	@Column()
		isDone: boolean;

	@ManyToOne(() => Collection, collection => collection.tasks)
		collection: Collection;
	
	@ManyToOne(() => User, user => user.tasks)
		user: User;

}