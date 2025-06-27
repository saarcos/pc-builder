"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { pcbuilderSchema } from '@/features/pcbuilder/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ComponentCard from './BuildTypeCard';
import { usePcBuilderStore } from '@/app/(main)/builder/store';
import { usePCBuilderData } from '@/hooks/usePcBuilderData';
const purposeSchema = pcbuilderSchema.pick({
    usage: true,
    budget: true,
});
type PurposeSchema = z.infer<typeof purposeSchema>
export default function StartForm() {
    const setData = usePcBuilderStore((state) => state.setData);
    const { usage, budget } = usePCBuilderData();

    useGSAP(() => {
        gsap.from(".start-form-child", {
            y: 50,
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.5,
        });
    }, []);
    const router = useRouter();
    const form = useForm<PurposeSchema>({
        resolver: zodResolver(purposeSchema),
        defaultValues: {
            usage: undefined,
            budget: "",
        }
    });
    const onSubmit = (data: PurposeSchema) => {
        setData(data);
        router.push("/builder/preferences")
    };
    useEffect(() => {
        if (!usePcBuilderStore.persist.hasHydrated()) return
        if (usage || budget) {
            form.reset({ usage, budget: budget ?? "" });
        }
    }, [budget, usage, form])
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
