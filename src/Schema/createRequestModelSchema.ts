import z from "zod"


export const createRequestModelSchema = z.object({
    modelId: z.string().uuid({message: "UUid do modelo inválido."}),
    agencyId: z.string().uuid({message: "UUid da agência inválido."}).nullable()
})


export type createRequestModelInput = z.infer<typeof createRequestModelSchema>