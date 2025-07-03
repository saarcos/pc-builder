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
import axios from 'axios';

export default function LockForm() {
    const router = useRouter();
    const setData = usePcBuilderStore((state) => state.setData);
    const {
        usage,
        budget,
        preferredCPUBrand,
        preferredStorage,
        storageRequirement,
        lockedComponentsData
    } = usePCBuilderData();
    const hasHydrated = usePcBuilderStore((state) => state.hasHydrated);
    const filteredComponents = usePcBuilderStore((state) => state.filteredComponents);
    const setFilteredComponents = usePcBuilderStore((state) => state.setFilteredComponents)
    useEffect(() => {
        if (!hasHydrated) {
            return
        }
        if (!usage || !budget || !preferredCPUBrand || !preferredStorage || !storageRequirement) {
            router.push('/builder/start')
        }
        if (lockedComponentsData) {
            setLockedComponents(lockedComponentsData);
        }
    }, [usage, budget, preferredCPUBrand, preferredStorage, storageRequirement, lockedComponentsData, router, hasHydrated, filteredComponents])
    const [lockedComponents, setLockedComponents] = useState<LockedComponents>({});
    const lockedSchema = pcbuilderSchema.pick({ lockedComponents: true });
    const [loading, setLoading] = useState(false);
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
    const onSubmit = async() => {
        try {
            setLoading(true);
            const parsed = lockedSchema.parse({ lockedComponents });
            setData(parsed);
            const { filtered } = validateBuildStep3({ filteredComponents, lockedComponents });
            if (filtered) {
                setFilteredComponents(filtered);
            }
            const payload = {
                usage,
                budget,
                storageRequirement,
                rawComponents: filtered
            };
            const response = await axios.post('/api/generate-build', payload);
            console.log('Build generated: ', response.data);
            localStorage.setItem('generatedBuild', JSON.stringify(response.data));
            router.push('/builder/preview')

        } catch (e) {
            console.error("Errores de validación:", e);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    };
    const mapper = {
        'processors': 'cpu',
        'video-cards': 'gpu',
        'motherboards': 'motherboard',
        'hard-drives': 'storage',
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
                {
                    Object.keys(filteredComponents).map((componentType) => {
                        const name = mapper[componentType as keyof typeof mapper];
                        if (!name) return null;

                        return (
                            <ComponentContainer
                                key={componentType}
                                component={{ name, componentType }}
                                onSelect={handleSelect}
                                onDelete={handleDeleteComponent}
                                lockedValue={lockedComponents[componentType as keyof LockedComponents]}
                                filteredItems={filteredComponents[componentType] || []}
                            />
                        );
                    })
                }
            </div>
            <div className='flex items-center justify-center mt-5 start-form-child'>
                <Button
                    onClick={onSubmit}
                    className='px-8 py-5 cursor-pointer bg-transparent border-2 border-emerald-400 shadow-[0px_0px_5px_#22c55e] hover:shadow-[0px_0px_10px_#22c55e] hover:bg-transparent font-pressstart'
                >
                    {loading ? 'Generando...': 'Generar build'}
                </Button>
            </div>
        </div>
    )
}
