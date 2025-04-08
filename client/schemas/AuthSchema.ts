import { z } from 'zod'

export const loginSchema = z.object({
    username: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    password: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
})

export type loginSchemaType = z.infer<typeof loginSchema>