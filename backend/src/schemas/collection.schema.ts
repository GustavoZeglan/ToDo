import * as z from 'zod';

export const colleactionSchema = z.object({
  collectionId: z.string({ required_error: 'O id da coleção é obrigatório' }),
  collectionName: z
    .string({
      required_error: 'O nome da coleção é obrigatório',
    })
    .min(3, 'O Nome precisar ter no minímo 3 caracteres.'),
  image: z.string().optional(),
});
