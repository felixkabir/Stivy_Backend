import z from "zod"


export const createPostSchema = z.object({
    content: z.string().min(1, {message: "O conteúdo do post deve ter no mínimo 1 caractere."})
})


export type createPostInput = z.infer<typeof createPostSchema>