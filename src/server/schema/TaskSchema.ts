import * as z from "zod";

export const TaskSchema = z.object({
	taskId: z.string({required_error: "O campo taskId é obrigatório"}),
	// collectionId: z.string({required_error: "O campo collectionId é obrigatório"}),
	name: z.string({required_error: "O campo name é obrigatório"}).min(5),
	description: z.string().optional(),
	isDone: z.boolean({required_error: "O campo boolean é obrigatório"}),
});