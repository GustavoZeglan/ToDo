import { z } from "zod";

const collectionSchema = z.object({
    collectionName: z
        .string({
            required_error: 'O nome da coleção é obrigatório',
        })
        .min(3, 'O Nome precisar ter no minímo 3 caracteres.')
        .max(16, 'O Nome precisar ter no máximo 16 caracteres.'),
    image: z.string(),
});


export { collectionSchema };
