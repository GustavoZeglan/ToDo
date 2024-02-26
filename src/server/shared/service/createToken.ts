import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

export const createToken = (userId: number): string => {

	const secret = String(process.env.SECRET);

	const token = jwt.sign({userId: userId, algorithm: "RS256", expiresIn: "7d"},secret);

	return token;
};