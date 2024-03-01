import { AppDataSource } from "./connection";
import { Task } from "./entity/Task";
import { User } from "./entity/User";


export const verifyUserTask = async (userId: number, taskId: number): Promise<boolean | null> => {
	const userRepository = AppDataSource.getRepository(User);
	const taskRepository = AppDataSource.getRepository(Task);

	const user = await userRepository.findOneBy({ id: userId });
	if (!user) {
		return null;
	}

	const collection = await taskRepository.findOne({ where: { id: taskId, user: user } });
	if (collection) {
		return true;
	} else {
		return false;
	}
};