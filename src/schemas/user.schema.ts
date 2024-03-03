import * as z from 'zod';

export const userSchema = z.object({
  id: z.string({ required_error: 'O campo id é obrigatório' }),
  name: z
    .string({
      required_error: 'O campo nome é obigatório',
    })
    .min(3, 'O Nome precisar ter no minímo 3 caracteres.'),

  email: z
    .string({
      required_error: 'O campo email é obigatório',
    })
    .email('O email precisa ser válido.'),

  password: z
    .string({
      required_error: 'O campo senha é obigatório',
    })
    .min(8, 'A senha precisa de no minímo 8 caracteres.'),
});
