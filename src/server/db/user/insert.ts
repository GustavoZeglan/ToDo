import mysql from "mysql2/promise";
import { IUser } from "../../models/User";
import { databaseConfig } from "../connection";

export const insertUser = async (userData: IUser) => {
	// Criar uma conexão pool
	const pool = mysql.createPool(databaseConfig);

	// Obtendo uma conexão do pool
	const connection = await pool.getConnection();

	try {
		// Executar uma consulta SQL
		await connection.query("call add_user(?,?,?);",[userData.name,userData.email,userData.password]);
		console.log("Usuário inserido");
	} catch (error) {
		console.error("Erro ao executar a consulta:", error);
	} finally {
		// Liberar a conexão de volta para o pool
		connection.release();
	}
};