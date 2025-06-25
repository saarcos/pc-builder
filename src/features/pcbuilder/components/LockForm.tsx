import React from 'react'
import ComponentContainer from './lock-components/ComponentContainer'

export default function LockForm() {
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
                {[{ name: 'cpu', componentType: 'processors' }, { name: 'gpu', componentType: 'video-cards' }, { name: 'motherboard', componentType: 'motherboards' }].map((component, index) => (
                    <ComponentContainer key={index} component={component} />
                ))}
            </div>
        </div>
    )
}
