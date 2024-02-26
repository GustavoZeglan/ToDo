import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserByEmail } from "../../db/user/getUserByEmail";
import { insertUser } from "../../db/user/insert";
import { IUser } from "../../models/User";


export const create: RequestHandler = async (req, res) => {

	const {name,email,password} = req.body;

	const userData: IUser = {
		name,
		email,
		password
	};

	const user = await getUserByEmail(userData);

	if (userData.email === user?.email) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "Erro de validação", details: "Usuário já cadastrado"});
	}

	await insertUser(userData);
	res.json(req.body);
};

