import React from 'react'
import StartForm from '@/features/pcbuilder/components/StartForm'
import SectionWrapper from '@/components/SectionWrapper'

export default function Start() {
    
    return (
        <SectionWrapper id='inicio' title={['Escoge', 'Tu', 'Objetivo']} >
            <StartForm/>
        </SectionWrapper>
    )
}
