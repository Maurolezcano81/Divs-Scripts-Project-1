import { z } from 'zod'

export const loginSchema = z.object({
    username: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    password: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
})

export const registerSchema = z.object({
    fullname: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    username: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    email: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." })
        .email({ message: "Debes introducir un email valído." }),
    password: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    repeatPassword: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    sex: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
    nacionality: z
        .string({ invalid_type_error: "Este tipo de dato no es valído.", required_error: "Este campo es obligatorio." })
        .min(1, { message: "Este campo es obligatorio." }),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"]
})

export type loginSchemaType = z.infer<typeof loginSchema>
export type registerSchemaType = z.infer<typeof registerSchema>