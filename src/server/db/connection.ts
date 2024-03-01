import "reflect-metadata";
import { DataSource } from "typeorm";
import { Collection } from "./entity/Collection";
import { Task } from "./entity/Task";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "todo",
	entities: [User, Collection, Task],
	synchronize: true,
	logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
	.then(() => {
		// here you can start to work with your database
	})
	.catch((error) => console.log(error));