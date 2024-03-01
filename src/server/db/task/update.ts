import { AppDataSource } from "../connection";
import { Task } from "../entity/Task";

export const update = async (id: number,task: Task): Promise<void> => {

	try {

		const taskRepository = AppDataSource.getRepository(Task);
		await taskRepository.update(id, task); 

	} catch (err) {
		console.error(err);
	} 

};