import { AppDataSource } from "../connection";
import { User } from "../entity/User";

export const getUserById = async (userId: number): Promise<User | void> => {
	

	try {

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOneBy({id:userId});

		if (user != null) {
			return user;
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} 
} ;