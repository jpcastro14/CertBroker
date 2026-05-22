import { z } from "zod";


export const updateSchema = z.object({
    title: z.string().min(1, { error: 'Informe o nome do corretor' }),
    creci: z.transform(Number).pipe(z.number({ error: "Digite apenas números" }).min(1, { error: "Informe o registro do corretor" })),
    email: z.email({ error: 'Endereço de email inválido' }).min(3, { error: "Informe o email do corretor" }),
    phoneNumber: z.transform(Number).pipe(z.number({ error: "digite apenas números" }).min(11, { error: 'Informe o telefone do corretor' }))
});

export const saleSchema = z.object({
    title: z.string().min(1, { error: 'Informe o nome do empreendimento' }),
    saleValue: z.string()
})

export const clientSchema = z.object({
    name: z.string().min(1, { error: 'Informe o nome do cliente' }),
    isServer: z.boolean(),
    salary: z.transform(Number).pipe(z.number({ error: "Digite apenas números" }).min(1, { error: "Informe o registro do corretor" })),
    interest: z.string().min(1, { error: 'Informe o salário do cliente' }),
    contact: z.transform(Number).pipe(z.number({ error: "Digite apenas números" }).min(11, { error: 'Informe o telefone do cliente' })),
    email: z.email({ error: 'Endereço de email inválido' }).min(3, { error: "Informe o email do cliente" })
});

export type SaleSchema = z.infer<typeof saleSchema>

export type BrokerSchema = z.infer<typeof updateSchema>;

export type Clientschema = z.infer<typeof clientSchema>;
