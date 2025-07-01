"use client"
import React, { useEffect, useState } from 'react'
import ComponentContainer from './lock-components/ComponentContainer'
import { Button } from '@/components/ui/button';
import { Item, LockedComponents } from '@/app/types/pc-builder';
import { usePcBuilderStore } from '@/app/(main)/builder/store';
import { pcbuilderSchema } from '../schema';
import { usePCBuilderData } from '@/hooks/usePcBuilderData';
import { useRouter } from 'next/navigation';
import { validateBuildStep3 } from '@/lib/validateBuild';

export default function LockForm() {
    const router = useRouter();
    const setData = usePcBuilderStore((state) => state.setData);
    const {
        usage,
        budget,
        preferredCPUBrand,
        preferredGPUBrand,
        preferredStorage,
        storageRequirement,
        lockedComponentsData
    } = usePCBuilderData();
    const hasHydrated = usePcBuilderStore((state)=>state.hasHydrated);
    const filteredComponents = usePcBuilderStore((state)=>state.filteredComponents);
    useEffect(() => {
        if (!hasHydrated) {
            return
        }
        if (!usage || !budget || !preferredCPUBrand || !preferredGPUBrand || !preferredStorage || !storageRequirement) {
            router.push('/builder/start')
        }
        if(lockedComponentsData){
            setLockedComponents(lockedComponentsData);
        }
    }, [usage, budget, preferredCPUBrand, preferredGPUBrand, preferredStorage, storageRequirement, lockedComponentsData, router, hasHydrated, filteredComponents])
    const [lockedComponents, setLockedComponents] = useState<LockedComponents>({});
    const lockedSchema = pcbuilderSchema.pick({ lockedComponents: true });

    const handleSelect = (type: keyof LockedComponents, component: Item) => {
        setLockedComponents(prev => ({ ...prev, [type]: component }));
    }
    const handleDeleteComponent = (type: keyof LockedComponents) => {
        setLockedComponents(prev => {
            const updated = { ...prev };
            delete updated[type];
            return updated;
        });
    };
    const onSubmit = () => {
        try {
            const parsed = lockedSchema.parse({ lockedComponents });
            validateBuildStep3({filteredComponents, lockedComponents})
            return;
            setData(parsed);
        } catch (e) {
            console.error("Errores de validación:", e);
        }
    }
    return (
        <div className='font-inter text-white'>
            <h1 className='text-center text-2xl sm:text-3xl font-pressstart mb-4 drop-shadow-[0_0_5px_#00ffcc]'>
                Opcional
            </h1>
            <p className='text-sm text-gray-300 text-center max-w-xl mx-auto leading-relaxed'>
                Si lo deseas, puedes fijar uno o más componentes que quieras incluir sí o sí en tu build. El modelo se encargará de completar el resto de manera compatible.{' '}
                <span className='font-semibold text-emerald-400 underline'>También puedes continuar sin seleccionar ninguno.</span>
            </p>

            <div className='mt-8 border border-emerald-400/40 rounded-xl shadow-inner shadow-emerald-500/10 bg-emerald-200/5 backdrop-blur-sm'>
                <div className='p-4 border-b border-emerald-600/30 font-semibold text-emerald-300 tracking-wide'>
                    Componentes a fijar
                </div>
                {[{ name: 'cpu', componentType: 'processors' }, { name: 'gpu', componentType: 'video-cards' }, { name: 'motherboard', componentType: 'motherboards' }, { name: 'storage', componentType: 'hard-drives' }].map((component, index) => (
                    <ComponentContainer key={index} component={component} onSelect={handleSelect} onDelete={handleDeleteComponent} lockedValue={lockedComponents[component.name as keyof LockedComponents]} filteredItems = {filteredComponents[component.componentType] || []}/>
                ))}
            </div>
            <div className='flex items-center justify-center mt-5 start-form-child'>
                <Button
                    onClick={onSubmit}
                    className='px-8 py-5 cursor-pointer bg-transparent border-2 border-emerald-400 shadow-[0px_0px_5px_#22c55e] hover:shadow-[0px_0px_10px_#22c55e] hover:bg-transparent font-pressstart'
                >
                    Generar Build
                </Button>
            </div>
        </div>
    )
}
