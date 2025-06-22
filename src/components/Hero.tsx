import React from 'react'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden text-white text-sm sm:text-base flex items-center justify-center px-4">
            <div className="flex flex-col gap-6 text-center max-w-2xl">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl sm:text-6xl font-bold drop-shadow-[0_0_5px_#ff0057]">
                        PCBuilds
                    </h1>
                    <p className="text-slate-200 text-lg">
                        Encuentra la mejor combinación de componentes en stock para tu PC.
                    </p>
                    <button className="py-2 px-7 border-2 rounded-2xl mx-auto cursor-pointer text-white border-[#ff0057] shadow-[0_0_10px_#ff0057] hover:shadow-[0_0_20px_#ff0057] transition-shadow duration-300 font-semibold">
                        Empezar
                    </button>
                </div>
            </div>
        </section>
    )
}
