import React from 'react'
import LockForm from '@/features/pcbuilder/components/LockForm'
import SectionWrapper from '@/components/SectionWrapper'

export default function Lock() {
    return (
        <SectionWrapper id='locked-components' title={['Fija', 'piezas', 'Claves']}>
            <LockForm />
        </SectionWrapper>
    )
}
