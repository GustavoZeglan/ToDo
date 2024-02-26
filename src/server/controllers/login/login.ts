import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserByEmail } from "../../db/user/getUserByEmail";
import { IUser } from "../../models/User";
import { createToken } from "../../shared/service/createToken";


export const login: RequestHandler = async (req, res) => {

	const { name, email, password } = req.body;

	const userData: IUser = {
		id: 0,
		name,
		email,
		password
	};

	const user = await getUserByEmail(userData);

	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "Erro de validação", details: "Usuário não cadastrado" });
	}

	const isMatch = bcrypt.compareSync(userData.password, user.password);

	if (user && isMatch) {
		const token = createToken(user.id);
		return res.status(StatusCodes.OK).json({ token: "Bearer " + token });
	}

	return res.status(StatusCodes.BAD_REQUEST).json({ error: "Erro de validação", details: "Senha incorreta" });

};

