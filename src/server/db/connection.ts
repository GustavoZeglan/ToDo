import dotenv from "dotenv";

dotenv.config();

const databaseConfig = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
};

export { databaseConfig };
