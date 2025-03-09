import z from "zod"

export const createEventSchema = z.object({
    name: z.string().min(1, {message: "O nome do evento deve conter no mínimo 1 caractere."}),
    start_date: z.date({required_error: "Data inválida"}),
    end_date: z.date({required_error: "Data inválida"})
})


export type createEventInput = z.infer<typeof createEventSchema>