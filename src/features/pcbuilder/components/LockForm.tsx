import Input from '@/components/Input'
import React from 'react'

export default function LockForm() {
    return (
        <form>
            <div className='w-full flex flex-col gap-8'>
                <Input label='Presupuesto' id='budget' type='number' description='Selecciona algún componente que quisieras incluir definitivamente en la build (opcional)' />
                <button>Siguiente</button>
            </div>
        </form>
    )
}
