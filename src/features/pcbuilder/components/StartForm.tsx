"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { pcbuilderSchema } from '@/features/pcbuilder/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ComponentCard from './BuildTypeCard';
import { usePcBuilderStore } from '@/app/(main)/builder/store';
import { usePCBuilderData } from '@/hooks/usePcBuilderData';
import axios from 'axios';
import { Item } from '@/app/types/pc-builder';
import { validateBuildStep1 } from '@/lib/validateBuild';
const purposeSchema = pcbuilderSchema.pick({
    usage: true,
    budget: true,
}).extend({
    officeGraphicsType: z.enum(['integrated', 'dedicated']).optional(),
}).refine(
    (data) => {
        if (data.usage === 'office') {
            return !!data.officeGraphicsType;
        }
        return true;
    },
    {
        message: "Debes seleccionar si necesitas gráficos integrados o dedicados",
        path: ["officeGraphicsType"],
    }
);
type PurposeSchema = z.infer<typeof purposeSchema>
export default function StartForm() {
    const setData = usePcBuilderStore((state) => state.setData);
    const setFilteredComponents = usePcBuilderStore((state) => state.setFilteredComponents);
    const { usage, budget } = usePCBuilderData();
    const [components, setComponents] = useState<Item[]>([]);
    const hasHydrated = usePcBuilderStore((state) => state.hasHydrated);
    
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await axios.get('/api/components');
                const data = await response.data;
                setComponents(data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchComponents();
    }, [])
    const router = useRouter();
    const form = useForm<PurposeSchema>({
        resolver: zodResolver(purposeSchema),
        defaultValues: {
            usage: undefined,
            budget: "",
            officeGraphicsType: undefined
        }
    });
    const onSubmit = (data: PurposeSchema) => {
        const finalUsage = data.usage === 'office'
            ? data.officeGraphicsType === 'integrated'
                ? 'office-integrated'
                : 'office-dedicated'
            : data.usage;
        const payload = {
            usage: finalUsage,
            budget: Number(data.budget),
            components
        }
        const { valid, missingComponents, filtered } = validateBuildStep1(payload);
        if (!valid) {
            alert(`Con el propósito y presupuesto establecido no existen componentes que satisfagan tus requerimientos, faltan: ${missingComponents}`);
            return;
        }
        setData({ ...data, usage: finalUsage });
        setFilteredComponents(filtered);
        router.push("/builder/preferences");
    };
    useEffect(() => {
        if (!hasHydrated) return;

        if (!usage || !budget) return;

        if (usage === 'office-integrated') {
            form.reset({
                usage: 'office',
                officeGraphicsType: 'integrated',
                budget
            });
        } else if (usage === 'office-dedicated') {
            form.reset({
                usage: 'office',
                officeGraphicsType: 'dedicated',
                budget
            });
        } else {
            form.reset({ usage, budget });
        }
    }, [budget, usage, form, hasHydrated]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='font-inter flex flex-col gap-6'
            >
                <div className="start-form-child">
                    <FormField
                        control={form.control}
                        name="usage"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Para qué usarás el pc?</FormLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <ComponentCard
                                        name="Gaming"
                                        urlPath="/images/gaming.png"
                                        selected={field.value === 'gaming'}
                                        onClick={() => field.onChange('gaming')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name="Renderizado"
                                        urlPath="/images/render.png"
                                        selected={field.value === 'render'}
                                        onClick={() => field.onChange('render')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name="Oficina/Estudio"
                                        urlPath="/images/office.png"
                                        selected={field.value === 'office'}
                                        onClick={() => field.onChange('office')}
                                        hasError={fieldState.invalid}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {form.watch('usage') === 'office' && (
                    <div className="start-form-child">
                        <FormField
                            control={form.control}
                            name="officeGraphicsType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Qué tipo de gráficos necesitas?</FormLabel>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <ComponentCard
                                            name="Integrados"
                                            urlPath="/images/integrated.webp"
                                            selected={field.value === 'integrated'}
                                            onClick={() => field.onChange('integrated')}
                                            hasError={false}
                                        />
                                        <ComponentCard
                                            name="Dedicados"
                                            urlPath="/images/dedicated.png"
                                            selected={field.value === 'dedicated'}
                                            onClick={() => field.onChange('dedicated')}
                                            hasError={false}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                <div className="start-form-child">
                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Cuál es tu presupuesto?</FormLabel>
                                <FormControl>
                                    <Input {...field} type='number' onChange={(e) => field.onChange(e.target.value)} placeholder='$1000'
                                        className="bg-zinc-950/50 text-white placeholder:text-emerald-300 border border-emerald-400 rounded-xl px-4 shadow-inner shadow-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200 py-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex items-center justify-center mt-2 start-form-child'>
                    <Button type="submit"
                        className='px-8 py-5 cursor-pointer bg-transparent border-2 border-emerald-400 shadow-[0px_0px_5px_#22c55e] hover:shadow-[0px_0px_10px_#22c55e] hover:bg-transparent font-pressstart'>Siguiente</Button>
                </div>
            </form>
        </Form>
    )
}
