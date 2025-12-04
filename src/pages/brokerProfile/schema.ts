import { z } from "zod";


export const updateSchema = z.object({
    title: z.string().min(1, { error: "Informe o nome do corretor" }),
    creci: z.number().min(1, 'required'),
    email: z.email().min(1, { error: 'Informe um email valido' }),
    phoneNumber: z.number().min(1, { error: 'Digite um numero de celular válido' })
})

export type BrokerSchema = z.infer<typeof updateSchema>