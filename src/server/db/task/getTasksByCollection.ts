import { AppDataSource } from "../connection";
import { Collection } from "../entity/Collection";
import { Task } from "../entity/Task";

export const getTaskByCollection = async (collection: Collection): Promise<Array<Task> | void> => {
	
	
	try {

		const taskRepository = AppDataSource.getRepository(Task);
		const tasks = await taskRepository.findBy({collection:collection});

		if (tasks != null) {
			return tasks;
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} 

} ;

