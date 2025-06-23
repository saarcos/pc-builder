"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Hero() {
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/builder');
    }
    return (
        <section className="relative h-screen w-full overflow-hidden text-white text-sm sm:text-base flex items-center justify-center px-4">
            <div className="flex flex-col gap-6 text-center max-w-2xl">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl sm:text-6xl font-bold drop-shadow-[0_0_5px_#22c55e] font-pressstart">
                        PCBuilds
                    </h1>
                    <p className="text-slate-200 text-lg font-inter">
                        Encuentra la mejor combinación de componentes en stock para tu PC.
                    </p>
                    <button onClick={handleNavigation} className="py-2 px-7 border-2 rounded-2xl mx-auto cursor-pointer text-white border-[#22c55e] shadow-[0_0_5px_#22c55e] hover:shadow-[0_0_10px_#22c55e] transition-shadow duration-300 font-semibold font-pressstart">
                        Empezar
                    </button>
                </div>
            </div>
        </section>
    )
}
