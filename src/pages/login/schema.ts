import { z } from "zod";

export const userschema = z.object({
    email: z.email('Insira um email valido'),
    password: z.string().min(1, { error: "Digite sua senha" })
})

export type UserSchema = z.infer<typeof userschema>