import z from "zod"


export const createModelSchema = z.object({
    name: z.string().min(1, {message: "O nome do modelo deve ter no mínimo 1 caractere."}).nullable(),
    shoes: z.string().min(1, {message: "O campo shoes deve ter no mínimo 1 caractere."}).nullable(),
    waist: z.string().min(1, "O campo waist deve ter no minimo 1 caractere.").nullable(),
    height: z.string().min(1, {message: "O campo height deve ter no mínimo 1 caractere."}).nullable(),
    userId: z.string().uuid({message: "Id do usuário inválido"}).nullable(),
    contact: z.string().min(1, "O contacto é obrigatório.").nullable()
})


export type createModelInput = z.infer<typeof createModelSchema>