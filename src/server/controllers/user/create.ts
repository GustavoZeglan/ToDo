import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../db/entity/User";
import { getUserByEmail } from "../../db/user/getUserByEmail";
import { insertUser } from "../../db/user/insert";
import { passwordGenerator } from "../../shared/service/paswordGenerator";

export const create: RequestHandler = async (req, res) => {

	const {name,email} = req.body;
	let {password} = req.body;

	const hashedPassword = await passwordGenerator(password);

	if (hashedPassword != undefined) {
		password = hashedPassword;
	}


	const userData: User = new User();

	userData.name = name;
	userData.email = email;
	userData.password = password;

	const user = await getUserByEmail(email);

	if (userData.email === user?.email) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "Erro de validação", details: "Usuário já cadastrado"});
	}

	await insertUser(userData);
	res.json(req.body);
};

