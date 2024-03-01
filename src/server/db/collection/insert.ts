import { AppDataSource } from "../connection";
import { Collection } from "../entity/Collection";

export const insert = async (collection: Collection): Promise<void> => {

	try {

		const collectionRepository = AppDataSource.getRepository(Collection);
		await collectionRepository.save(collection);

	} catch (err) {
		console.error("Erro ao executar a consulta:", err);
	}

};