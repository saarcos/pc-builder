import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Cog } from 'lucide-react';
import React, { useRef } from 'react'

export default function Loading() {
    const loaderRef = useRef(null);
    useGSAP(() => {
        if (loaderRef.current) {
            gsap.fromTo(
                loaderRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
            );
        }
    }, []);
    return (
        <div className="h-screen flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4" ref={loaderRef}>
                <Cog className="w-24 h-24 animate-spin text-emerald-500 drop-shadow-[0_0_15px_#22c55e]" />
                <p className="text-xl font-bold animate-pulse text-emerald-400 text-center">Cargando...</p>
            </div>
        </div>
    )
}
