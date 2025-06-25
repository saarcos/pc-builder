"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
gsap.registerPlugin(SplitText);
export default function Hero() {
    const router = useRouter();
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);

    const handleNavigation = () => {
        router.push('/builder');
    };
    useGSAP(() => {
        const split = new SplitText(titleRef.current, {
            type: "chars, words",
            charsClass: "char",
            wordsClass: "word",
        });

        const paragraphSplit = new SplitText(paragraphRef.current, {
            type: 'words'
        });

        gsap.from(split.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.06,
            duration: 0.6,
            ease: "expo.out",
        });

        gsap.from(paragraphSplit.words, {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power3.out",
            stagger: {
                each: 0.05,
                from: "start",
            },
            delay: 0.7,
        });

        gsap.from(buttonRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "expo.out",
            delay: 1.5,
        });
    }, []);
    return (
        <section className="relative w-full min-h-[calc(100vh-72px)] overflow-hidden text-white text-sm sm:text-base flex items-center justify-center px-4">
            <div className="flex flex-col gap-6 text-center max-w-2xl">
                <div className="flex flex-col gap-4">
                    <h1 ref={titleRef} className="text-5xl sm:text-6xl font-bold drop-shadow-[0_0_5px_#22c55e] font-pressstart">
                        PCBuilds
                    </h1>
                    <div

                        className="flex flex-col gap-4"
                    >
                        <p ref={paragraphRef} className="text-slate-200 text-lg font-inter">
                            Encuentra la mejor combinación de componentes en stock para tu PC.
                        </p>
                        <button
                            ref={buttonRef}
                            onClick={handleNavigation}
                            className="py-2 px-7 border-2 rounded-2xl mx-auto cursor-pointer text-white border-[#22c55e] shadow-[0_0_5px_#22c55e] hover:shadow-[0_0_10px_#22c55e] transition-shadow duration-300 font-semibold font-pressstart"
                        >
                            Empezar
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
