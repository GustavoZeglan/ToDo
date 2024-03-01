import { AppDataSource } from "./connection";
import { Collection } from "./entity/Collection";
import { User } from "./entity/User";


export const verifyUserCollection = async (userId: number, collectionId: number): Promise<boolean | void> => {
	const userRepository = AppDataSource.getRepository(User);
	const collectionRepository = AppDataSource.getRepository(Collection);

	const user = await userRepository.findOneBy({ id: userId });
	if (!user) {
		return;
	}

	const collection = await collectionRepository.findOne({ where: { id: collectionId, user: user } });
	if (collection) {
		return true;
	} else {
		return false;
	}
};