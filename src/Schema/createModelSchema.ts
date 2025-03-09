import z from "zod"


export const createModelSchema = z.object({
    name: z.string().min(1, {message: "O nome do modelo deve ter no mínimo 1 caractere."}),
    shoes: z.string().min(1, {message: "O campo shoes deve ter no mínimo 1 caractere."}),
    waist: z.string().min(1, "O campo waist deve ter no minimo 1 caractere."),
    height: z.string().min(1, {message: "O campo height deve ter no mínimo 1 caractere."}),
    userId: z.string().uuid({message: "Id do usuário inválido"}),
    contact: z.string().min(1, "O contacto é obrigatório.")
})


export type createModelInput = z.infer<typeof createModelSchema>