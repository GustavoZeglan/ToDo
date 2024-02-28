import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCollectionById } from "../../db/collection/getCollectionById";
import { insert } from "../../db/task/insert";
import { ITask } from "../../models/Task";


export const create: RequestHandler = async (req,res) => {

	const {name,description} = req.body;
	const collectionId = req.params.collectionId; 
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

	const collection = await getCollectionById(collectionId);

	if (!collection) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: "A coleção informada não existe"});
	}

	const task: ITask = {
		collectionId,
		name,
		isDone: false,
		description
	};

	await insert(task);
	return res.status(StatusCodes.OK).json(req.body);

};