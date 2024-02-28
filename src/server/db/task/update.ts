import mysql from "mysql2/promise";
import { ITask } from "../../models/Task";
import { databaseConfig } from "../connection";

export const update = async (task: ITask) => {

	const pool = mysql.createPool(databaseConfig);
	const connection = await pool.getConnection();

	try {
		await connection.query("call update_task(?,?,?,?)",[task.id,task.name,task.description,task.isDone]);
	} catch (err) {
		console.error(err);
	} finally {
		connection.release();
	}

};