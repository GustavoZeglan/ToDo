import mysql from "mysql2/promise";
import { ICollection } from "../../models/Collection";
import { databaseConfig } from "../connection";

export const insert = async (collection: ICollection) => {

	const pool = mysql.createPool(databaseConfig);

	const connection = await pool.getConnection();

	try {

		await connection.query("call add_collection(?,?,?,?)", 
			[collection.userId, collection.collectionName, collection.image, collection.color]);

		console.log("Collection inserida");

	} catch (err) {
		console.error("Erro ao executar a consulta:", err);
	} finally {
		connection.release();
	}

};