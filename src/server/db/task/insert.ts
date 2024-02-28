import mysql from "mysql2/promise";
import { ITask } from "../../models/Task";
import { databaseConfig } from "../connection";


export const insert = async (task: ITask) => {

	const pool = mysql.createPool(databaseConfig);
	const connection = await pool.getConnection();

	try {
		await connection.query("call add_task(?,?,?)",[task.collectionId,task.name,task.description]);
	} catch (err) {
		console.error(err);
	} finally {
		connection.release();
	}

};