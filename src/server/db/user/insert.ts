import { AppDataSource } from "../connection";
import { User } from "../entity/User";

export const insertUser = async (newUser: User): Promise<void> => {

	try {
		const userRepository = AppDataSource.getRepository(User);
		await userRepository.save(newUser);
	} catch (error) {
		console.error("Erro ao executar a consulta:", error);
	}
};
