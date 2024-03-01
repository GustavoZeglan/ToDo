import { AppDataSource } from "../connection";
import { Collection } from "../entity/Collection";

export const getCollectionById = async (collectionId: number): Promise<Collection | void> => {
	
	try {
	
		const collectionRepository = AppDataSource.getRepository(Collection);
		const collection = await collectionRepository.findOneBy({id:collectionId});

		if (collection != null) {
			return collection;
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} 

} ;