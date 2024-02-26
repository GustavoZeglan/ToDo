import dotenv from "dotenv";
import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

dotenv.config();

export const authentication:RequestHandler = (req,res,next) => {

	const token = req.headers.authorization?.split(" ")[1];

	if(!token) {
		return res.status(401).json({error: "Token não fornecido"});
	}

	try {
		const secret = String(process.env.SECRET);
		jwt.verify(token,secret);
		
		return next();
	} catch (err) {
		return res.json({error: "Token inválido"});
	}

};