/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as z from "zod";

export const validate = (schema: z.ZodType<any>) => {
	return async function (req: Request, res: Response, next: NextFunction) {
		const data = req.body;

		try {
			// Validando os dados usando o esquema fornecido
			await schema.parseAsync(data);
			return next(); // Se a validação for bem-sucedida, passe para o próximo middleware ou rota
		} catch (error) {
			// Se ocorrer um erro de validação, envie uma resposta de erro com os detalhes
			const zodError = error as z.ZodError;
			const errorMessage = zodError.errors.map(err => err.message);
			return res.status(StatusCodes.BAD_REQUEST).json({ error: "Erro de validação", details: errorMessage });
		}
	};
};