import { AppDataSource } from "../connection";
import { Task } from "../entity/Task";


export const getTaskById = async (taskId: number): Promise<Task | void> => {
	

	try {
	
		const taskRepository = AppDataSource.getRepository(Task);
		const task = await taskRepository.findOneBy({id:taskId});

		if (task != null) {
			return task;
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} 
} ;