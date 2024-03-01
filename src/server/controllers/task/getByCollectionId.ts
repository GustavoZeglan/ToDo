import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyUserCollection } from "../../db/VerifyUserCollection";
import { getCollectionById } from "../../db/collection/getCollectionById";
import { getTaskByCollection } from "../../db/task/getTasksByCollection";
import { getUserById } from "../../db/user/getUserById";

export const getByCollectionId:RequestHandler = async (req,res) => {

	const collectionId = Number(req.params.collectionId);
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

	const collection = await getCollectionById(collectionId);

	if (!collection) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A tarefa informada não existe"});
	}

	const collectionBelongsToUser = await verifyUserCollection(userId,collectionId);

	if (!collectionBelongsToUser) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A coleção não pertence ao usuário informado"});
	}

	const tasks = await getTaskByCollection(collection);

	if (!tasks) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "Sem tarefas cadastradas nessa coleção"});
	}

	return res.status(StatusCodes.OK).json({tasks:tasks});
};