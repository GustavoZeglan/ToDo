import { AppDataSource } from "../connection";
import { Task } from "../entity/Task";


export const insert = async (task: Task): Promise<void> => {


	try {
		const taskRepository = AppDataSource.getRepository(Task);
		await taskRepository.save(task);
	} catch (err) {
		console.error(err);
	} 
};