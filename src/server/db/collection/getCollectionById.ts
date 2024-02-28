import mysql from "mysql2/promise";
import { ICollection } from "../../models/Collection";
import { databaseConfig } from "../connection";

export const getCollectionById = async (collectionId: string) => {
	
	const pool = mysql.createPool(databaseConfig);
	const connection = await pool.getConnection();
	
	try {
		
		const [rows] = await connection.query("SELECT * FROM collection where collectionId = (?)",[collectionId]);

		const collec: ICollection[] = rows as ICollection[];

		if (collec != null) {
			return collec[0];
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} finally {
		connection.release();
	}

} ;