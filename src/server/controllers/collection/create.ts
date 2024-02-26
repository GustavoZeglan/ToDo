import dotenv from "dotenv";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { insert } from "../../db/collection/insert";
import { ICollection } from "../../models/Collection";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create:RequestHandler = async (req,res) => {

	const {collectionName,image,color} = req.body;
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

	const collection: ICollection ={
		userId: user,
		collectionName,
		image,
		color
	};

	await insert(collection);
	res.status(200).json(req.body);
};