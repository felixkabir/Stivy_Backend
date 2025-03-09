import z from "zod"


export const createUserSchema = z.object({
    username: z.string().min(1, {message: "O nome de usuário deve ter no mínomo 1 caractere"}),
    email: z.string().email({message: "Email inválido."}),
    password: z.string().min(6, {message: "A senha deve ter no mínimo 6 caracteres"}),
    interest_types: z.string().min(1, {message: "Por favor, preencha os interesses do usuário."})
})

export type CreateUserInput = z.infer<typeof createUserSchema>