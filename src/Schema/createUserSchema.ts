import z from "zod"


export const createUserSchema = z.object({
    username: z.string().min(1, {message: "O nome de usuário deve ter no mínomo 1 caractere"}),
    email: z.string().email({message: "Email inválido."}),
    password: z.string().min(6, {message: "A senha deve ter no mínimo 6 caracteres"}),
    interest_types: z.string().min(1, {message: "Por favor, preencha os interesses do usuário."})
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").optional(),
  interest_types: z.string().optional()
}).partial().refine(data => {
  return Object.values(data).some(value => value !== undefined);
}, {
  message: "At least one field must be provided for update"
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;


export const updateAgencySchema = z.object({
    name: z.string().optional(),
    contact: z.string().email().optional(),
  }).partial().refine(data => {
    return Object.values(data).some(value => value !== undefined);
  }, {
    message: "At least one field must be provided for update"
  });
  
  export type UpdateAgencyInput = z.infer<typeof updateAgencySchema>;