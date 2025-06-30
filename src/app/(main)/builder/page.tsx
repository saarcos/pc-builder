"use client"
import FormStepCard from '@/components/builder/FormStepCard'
import SectionWrapper from '@/components/SectionWrapper'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export type StepInformation = {
    header: string,
    description: string,
}
export default function Builder() {
    const router = useRouter();
    const formStepInfo: StepInformation[] = [
        {
            header: 'Selecciona tu objetivo',
            description: 'Indícanos para qué usarás tu PC: gaming, renderización, oficina, etc. Esto nos permite adaptar la build a tus necesidades específicas.'
        },
        {
            header: "Selecciona tus preferencias",
            description: "Cuéntanos qué marcas prefieres para procesadores, tarjetas gráficas o almacenamiento. Así priorizaremos componentes de tu gusto en la build."
        },
        {
            header: "Fija componentes",
            description: "Si ya tienes componentes en mente, puedes bloquearlos para asegurarte de que estén incluidos en tu build final. Esta sección es opcional."
        }
    ]
    const handleRedirect = () => {
        router.push('/builder/start')
    }

    return (
        <SectionWrapper id='builder' title={['Arma', 'tu', 'PC']}>
            <div className='font-inter'>
                <p className='text-base text-white/90'>
                    En esta sección podrás generar tu build ideal con ayuda de nuestro agente de inteligencia artificial. Para lograrlo, necesitaremos recopilar información clave sobre tus objetivos, preferencias personales y posibles componentes que ya tengas en mente.
                </p>
                <div className='mt-5 flex flex-col gap-4'>
                    {formStepInfo.map((information, index) => (
                        <FormStepCard key={index} step={index + 1} information={information} />
                    ))}
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <Button
                        onClick={handleRedirect}
                        className='px-8 py-5 cursor-pointer bg-transparent border-2 border-emerald-400 shadow-[0px_0px_5px_#22c55e] hover:shadow-[0px_0px_10px_#22c55e] hover:bg-transparent font-pressstart'
                    >
                        Comenzar
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    )
}
