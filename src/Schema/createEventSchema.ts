import z from "zod"

export const createEventSchema = z.object({
    name: z.string().min(1, {message: "O nome do evento deve conter no mínimo 1 caractere."}),
    start_date: z.string({required_error: "Data de início de evento inválida"}),
    end_date: z.string({required_error: "Data de fim de evento inválida"}),
    location: z.string().min(1, {message: "A localização do evento deve ter no mínimo 1 caractere."})
})


export type createEventInput = z.infer<typeof createEventSchema>