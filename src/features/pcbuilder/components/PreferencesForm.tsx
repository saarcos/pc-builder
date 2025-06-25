"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pcbuilderSchema } from '../schema'
import { z } from 'zod'
import ComponentCard from './BuildTypeCard'
import { Slider } from '@/components/ui/slider'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger);
export default function PreferencesForm() {
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
        gsap.from(".scroll-content", {
            autoAlpha: 0,   // opacity: 0 + visibility: hidden
            y: 50,          // baja 50px al inicio
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".scroll-content",
                start: "top 80%",   // cuando el top del elemento está al 80% de la ventana
                toggleActions: "play none none none", // se ejecuta solo 1 vez
            },
        });
    }, []);
    const router = useRouter();
    const preferencesSchema = pcbuilderSchema.pick({
        preferredCPUBrand: true,
        preferredGPUBrand: true,
        preferredStorage: true,
        storageRequirement: true,
    });
    type PreferencesSchema = z.infer<typeof preferencesSchema>;
    const form = useForm<PreferencesSchema>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            preferredCPUBrand: undefined,
            preferredGPUBrand: undefined,
            preferredStorage: undefined,
            storageRequirement: 1024
        }
    });
    const onSubmit = (data: PreferencesSchema) => {
        console.log(data);
        router.push("/builder/preferences")
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='font-inter flex flex-col gap-6 font-inter'
            >
                <div className="start-form-child">
                    <FormField
                        control={form.control}
                        name="preferredCPUBrand"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Qué marca de procesadores prefieres?</FormLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <ComponentCard
                                        name='Intel'
                                        urlPath='/images/intel.webp'
                                        selected={field.value === "intel"}
                                        onClick={() => field.onChange('intel')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name='AMD'
                                        urlPath='/images/amd.webp'
                                        selected={field.value === "amd"}
                                        onClick={() => field.onChange('amd')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name='Cualquiera'
                                        urlPath='/images/any.png'
                                        selected={field.value === "any"}
                                        onClick={() => field.onChange('any')}
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
                        name="preferredGPUBrand"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Qué marca de tarjetas de video prefieres?</FormLabel>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <ComponentCard
                                        name='Nvidia'
                                        urlPath='/images/nvidia.png'
                                        selected={field.value === 'nvidia'}
                                        onClick={() => field.onChange('nvidia')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name='Radeon'
                                        urlPath='/images/radeon.png'
                                        selected={field.value === 'amd'}
                                        onClick={() => field.onChange('amd')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name='Cualquiera'
                                        urlPath='/images/any-videocard.png'
                                        selected={field.value === 'any'}
                                        onClick={() => field.onChange('any')}
                                        hasError={fieldState.invalid}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="scroll-content">
                    <FormField
                        control={form.control}
                        name="preferredStorage"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Qué tipo de almacenamiento prefieres?</FormLabel>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <ComponentCard
                                        name='HDD'
                                        urlPath='/images/hdd.png'
                                        selected={field.value === 'HDD'}
                                        onClick={() => field.onChange('HDD')}
                                        hasError={fieldState.invalid}
                                    />
                                    <ComponentCard
                                        name='SSD'
                                        urlPath='/images/ssd.png'
                                        selected={field.value === 'SSD'}
                                        onClick={() => field.onChange('SSD')}
                                        hasError={fieldState.invalid}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="scroll-content">
                    <FormField
                        control={form.control}
                        name='storageRequirement'
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center justify-center'>
                                    <FormLabel className='text-xl font-semibold mb-4 text-white drop-shadow-[0px_0px_5px_#22c55e]'>¿Cuánto espacio necesitas?</FormLabel>
                                </div>

                                <div className="flex flex-col items-center gap-4 bg-zinc-900/50 p-6 rounded-xl border border-emerald-400/60 shadow-inner shadow-emerald-500/10">
                                    <p className="text-emerald-200 font-semibold bg-black/40 px-4 py-2 rounded-md shadow-[0_0_6px_#22c55e] font-mono tracking-wide">
                                        {field.value >= 1024
                                            ? field.value === 4096 ? `+${field.value / 1024}TB` : `${field.value / 1024}TB`
                                            : `${field.value}GB`}
                                    </p>
                                    <Slider
                                        value={[field.value ?? 256]}
                                        onValueChange={(val) => field.onChange(val[0])}
                                        min={256}
                                        max={4096}
                                        step={128}
                                        className="w-full cursor-pointer 
                                            [&_[role=slider]]:h-5 
                                            [&_[role=slider]]:w-5 
                                            [&_[role=slider]]:bg-emerald-400 
                                            [&_[role=slider]]:rounded-full 
                                            [&_[role=slider]]:shadow-[0_0_10px_#22c55e] 
                                            [&_[role=slider]]:transition-all 
                                            [&_[role=slider]]:duration-200 
                                            [&_[role=slider]]:hover:scale-110"
                                    />

                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    >
                    </FormField>
                </div>
                <div className='flex items-center justify-center mt-2 start-form-child'>
                    <Button type="submit"
                        className='px-8 py-5 cursor-pointer bg-transparent border-2 border-emerald-400 shadow-[0px_0px_5px_#22c55e] hover:shadow-[0px_0px_10px_#22c55e] hover:bg-transparent font-pressstart'>Siguiente</Button>
                </div>
            </form>
        </Form>
    )
}
