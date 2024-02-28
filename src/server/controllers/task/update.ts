import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTaskById } from "../../db/task/getTaskById";
import { update } from "../../db/task/update";
import { ITask } from "../../models/Task";


export const updateTask: RequestHandler = async (req,res) => {

	const {name,description} = req.body;
	const id = req.params.id; 
	const user = req.params.userId;

	if (!req.headers.authorization) {
		return res.status(401).json({ error: "Token não fornecido" });
	}

	const token = req.headers.authorization.split(" ")[1];


	const secret = String(process.env.SECRET);
	const decodedToken = jwt.verify(token, secret);

	if ((decodedToken as JwtPayload).userId != user) {
		return res.status(403).json({ error: "Token não pertence ao usuário informado" });
	}

	const getedTask = await getTaskById(id);

	if (!getedTask) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A tarefa informada não existe"});
	}

	const task: ITask = {
		id,
		collectionId: "0",
		name,
		isDone: false,
		description
	};

	await update(task);
	return res.status(StatusCodes.OK).json(req.body);

};