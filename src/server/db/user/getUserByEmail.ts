import mysql from "mysql2/promise";
import { IUser } from "../../models/User";
import { databaseConfig } from "../connection";

export const getUserByEmail = async (userData: IUser) => {
	
	const pool = mysql.createPool(databaseConfig);
	const connection = await pool.getConnection();

	try {

		const [rows] = await connection.query("SELECT * FROM user where email = (?)",[userData.email]);

		const user: IUser[] = rows as IUser[];

		if (user != null) {
			return user[0];
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} finally {
		connection.release();
	}

} ;