import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTaskById } from "../../db/task/getTaskById";
import { getUserById } from "../../db/user/getUserById";
import { verifyUserTask } from "../../db/verifyUserTask";

export const getById:RequestHandler = async (req,res) => {

	const taskId = Number(req.params.id); 
	const userId = Number(req.params.userId);

	if (!req.headers.authorization) {
		return res.status(401).json({ error: "Token não fornecido" });
	}

	const token = req.headers.authorization.split(" ")[1];


	const secret = String(process.env.SECRET);
	const decodedToken = jwt.verify(token, secret);

	if ((decodedToken as JwtPayload).userId != userId) {
		return res.status(403).json({ error: "Token não pertence ao usuário informado" });
	}

	const user = await getUserById(userId);

	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "O usuário informado não existe"});
	}

	const task = await getTaskById(taskId);

	if (!task) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A tarefa informada não existe"});
	}

	const taskBelongsToUser = await verifyUserTask(userId,taskId);

	if (!taskBelongsToUser) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A tarefa não pertence ao usuário informado"});
	}

	return res.status(StatusCodes.OK).json(task);
};