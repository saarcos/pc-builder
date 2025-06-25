import { z } from 'zod'

export const pcbuilderSchema = z.object({
    usage: z.enum(['gaming', 'render', 'office'], {
        errorMap: () => ({ message: 'Selecciona un propósito válido' })
    }),
    budget: z.string({
        required_error: "El presupuesto es obligatorio"
    })
        .min(1, { message: "El presupuesto es obligatorio" })
        .refine((val) => !isNaN(Number(val)), {
            message: "Debe ser un número válido"
        })
        .refine((val) => Number(val) >= 400, {
            message: "El presupuesto no puede ser menor a 400"
        }),
    preferredCPUBrand: z.enum(['intel', 'amd', 'any']),
    preferredGPUBrand: z.enum(['nvidia', 'amd', 'any']),
    preferredStorage: z.enum(['HDD', 'SSD']),
    storageRequirement: z.number({
        required_error: "El almacenamiento es obligatorio",
        invalid_type_error: "Debe ser un número",
    }).min(256, { message: "Mínimo 256 GB" }),
    lockedComponents: z.object({
        cpu: z.string().optional(),
        gpu: z.string().optional(),
        ram: z.string().optional(),
        storage: z.string().optional(),
        motherboard: z.string().optional(),
    }),

    candidates: z.object({
        cpu: z.array(z.any()),
        gpu: z.array(z.any()),
        ram: z.array(z.any()),
        storage: z.array(z.any()),
        motherboard: z.array(z.any()),
    })
});
export type PCBuilderSchema = z.infer<typeof pcbuilderSchema>
