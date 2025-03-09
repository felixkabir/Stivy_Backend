import z from "zod"


export const createAgencySchema = z.object({
    name: z.string().min(1, {message: "O nome da agência deve ter no mínimo 1 caractere."}),
    contact: z.string().min(9, {message: "Núnmero de telemóvel inválido."})
})

export type createAgencyInput = z.infer<typeof createAgencySchema>