import { z } from "zod";

export const userschema = z.object({
    email: z.email({ error: "Informe seu email no campo acima" }),
    password: z.string().min(1, { error: "Digite sua senha" })
})

export type UserSchema = z.infer<typeof userschema>