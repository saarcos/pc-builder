import { z } from 'zod'

const itemSchema = z.object({
    _id: z.string(),
    code: z.string(),
    componentType: z.string(),
    image: z.string().url(),
    lastUpdated: z.string(),
    link: z.string().url(),
    name: z.string(),
    price: z.number(),
});


export const pcbuilderSchema = z.object({
    usage: z.enum(['gaming', 'render', 'office', 'office-integrated', 'office-dedicated'], {
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
    preferredCPUBrand: z.enum(['intel', 'amd', 'any'], {
        errorMap: () => ({ message: 'Por favor, selecciona una preferencia' })
    }),
    preferredGPUBrand: z.enum(['rtx', 'rx', 'any']).optional(),
    preferredStorage: z.enum(['hdd', 'ssd'], {
        errorMap: () => ({message: 'Por favor, selecciona una preferencia'})
    }),
    storageRequirement: z.number({
        required_error: "El almacenamiento es obligatorio",
        invalid_type_error: "Debe ser un número",
    }).min(256, { message: "Mínimo 256 GB" }),
    lockedComponents: z.object({
        "processors": itemSchema.optional(),
        "video-cards": itemSchema.optional(),
        "memory": itemSchema.optional(),
        "hard-drives": itemSchema.optional(),
        "motherboards": itemSchema.optional(),
    })
});
export function getPreferencesSchema(hasGPU: boolean) {
  return z.object({
    preferredCPUBrand: z.enum(['intel', 'amd', 'any'], {
      errorMap: () => ({ message: 'Selecciona una opción' })
    }),
    preferredGPUBrand: hasGPU
      ? z.enum(['rtx', 'rx', 'any'], {
          errorMap: () => ({ message: 'Selecciona una opción' })
        })
      : z.enum(['rtx', 'rx', 'any']).optional(),
    preferredStorage: z.enum(['hdd', 'ssd'], {
      errorMap: () => ({ message: 'Selecciona una opción' })
    }),
    storageRequirement: z.number().min(256, { message: "Mínimo 256 GB" }),
  });
}
export type PCBuilderSchema = z.infer<typeof pcbuilderSchema>
