import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyUserCollection } from "../../db/VerifyUserCollection";
import { getCollectionById } from "../../db/collection/getCollectionById";
import { Task } from "../../db/entity/Task";
import { insert } from "../../db/task/insert";
import { getUserById } from "../../db/user/getUserById";


export const create: RequestHandler = async (req,res) => {

	const {name,description} = req.body;
	const userId = Number(req.params.userId);
	const collectionId = Number(req.params.collectionId); 

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
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A coleção informada não existe"});
	}

	const collectionBelongsToUser = await verifyUserCollection(userId,collectionId); 

	if (!collectionBelongsToUser) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A coleção não pertence ao usuário informado"});
	}

	const task: Task = new Task();

	task.name = name;
	task.description = description;
	task.isDone = false;
	task.collection = collection;
	task.user = user;

	await insert(task);
	return res.status(StatusCodes.OK).json(req.body);

};