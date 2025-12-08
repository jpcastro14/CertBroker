import { z } from "zod";


export const updateSchema = z.object({
    title: z.string().min(1, { error: 'Informe o nome do corretor' }),
    creci: z.transform(Number).pipe(z.number({ error: "Digite apenas números" }).min(1, { error: "Informe o registro do corretor" })),
    email: z.email({ error: 'Endereço de email inválido' }).min(3, { error: "Informe o email do corretor" }),
    phoneNumber: z.transform(Number).pipe(z.number({ error: "digite apenas números" }).min(11, { error: 'Informe o telefone do corretor' }))
});

export type BrokerSchema = z.infer<typeof updateSchema>;