"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { SplitText } from 'gsap/all';
import React, { useRef } from 'react'

type Props = {
  children: React.ReactNode,
  title: string[],
  id: string,
}
gsap.registerPlugin(SplitText);

export default function SectionWrapper({ children, title, id }: Props) {
  const titleRef = useRef(null);
  useGSAP(() => {
    const split = new SplitText(titleRef.current, {
      type: 'words'
    });

    gsap.from(split.words, {
      opacity: 0,
      y: 50,
      stagger: 0.09,
      duration: 1,
      ease: "expo.out",
    });
  }, []);
  return (
    <section id={id} className="min-h-[calc(100vh-72px)] flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm py-10 p-4 gap-2  shadow-inner text-ce">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-pressstart" ref={titleRef}>
          {title[0]}{" "}
          <span className="uppercase text-emerald-400 drop-shadow-[0_0_10px_#34d399]">
            {title[1]}
          </span>{" "}
          {title[2]}
        </h2>
      </div>
      <div className="max-w-[800px] flex flex-col w-full mx-auto gap-10 p-4">
        {children}
      </div>
    </section>
  )
}
