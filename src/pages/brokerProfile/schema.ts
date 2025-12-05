import { z } from "zod";


export const updateSchema = z.object({
    title: z.string(),
    creci: z.transform(Number).pipe(z.number({ error: "Digite apenas números" }).min(1, { error: "informe o registro do corretor" })),
    email: z.email({ error: 'Endereço de email inválido' }).min(3, { error: "informe o email do corretor" }),
    phoneNumber: z.transform(Number).pipe(z.number({ error: "digite apenas números" }).min(11, { error: 'Informe o telefone do corretor' }))
});

export type BrokerSchema = z.infer<typeof updateSchema>;