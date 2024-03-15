import { z } from "zod";

const userSchema = z.object({
    name: z.string({ required_error: 'O campo nome é obrigatório' }).min(3, 'O Nome precisar ter no minímo 3 caracteres.'),
    email: z.string({ required_error: 'O campo email é obrigatório' }).email('O email precisa ser válido.'),
    password: z.string({ required_error: 'O campo senha é obrigatório', }).min(8, 'A senha precisa de no minímo 8 caracteres.')
});

export { userSchema };
