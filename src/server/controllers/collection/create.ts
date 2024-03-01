import dotenv from "dotenv";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { insert } from "../../db/collection/insert";
import { Collection } from "../../db/entity/Collection";
import { getUserById } from "../../db/user/getUserById";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create:RequestHandler = async (req,res) => {

	const {collectionName,image,color} = req.body;
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
		return res.status(403).json({ error: "O usuário informado não existe" });
	}

	const collection: Collection = new Collection();

	collection.name = collectionName;
	collection.image = image;
	collection.color = color;
	collection.user = user;
	
	await insert(collection);
	res.status(200).json(req.body);
};