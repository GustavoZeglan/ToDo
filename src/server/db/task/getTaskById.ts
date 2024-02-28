import mysql from "mysql2/promise";
import { ITask } from "../../models/Task";
import { databaseConfig } from "../connection";

export const getTaskById = async (taskId: string) => {
	
	const pool = mysql.createPool(databaseConfig);
	const connection = await pool.getConnection();
	
	try {
		
		const [rows] = await connection.query("SELECT * FROM task where taskId = (?)",[taskId]);

		const collec: ITask[] = rows as ITask[];

		if (collec != null) {
			return collec[0];
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} finally {
		connection.release();
	}

} ;