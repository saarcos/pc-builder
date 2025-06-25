import React from 'react'
import PreferencesForm from '@/features/pcbuilder/components/PreferencesForm'
import SectionWrapper from '@/components/SectionWrapper'

export default function Preferences() {
    return (
        <SectionWrapper id='preferences' title={['CPU', 'GPU', 'DISCO']}>
            <PreferencesForm/>
        </SectionWrapper>
    )
}
