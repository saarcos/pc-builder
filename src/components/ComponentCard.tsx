import { Component } from '@/app/(main)/pccomponents/[componentType]/page'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  component: Component
}

export default function ComponentCard({ component }: Props) {
  return (
    <div className="rounded-2xl border border-emerald-600/30 bg-emerald-900/30 hover:shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300 overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-black/30">
        <Image
          src={component.image}
          alt={component.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw" 
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 text-white">
        <h2 className="text-lg font-bold leading-snug line-clamp-2">{component.name}</h2>
        <p className="text-emerald-400 text-base font-medium">${component.price}</p>
        <a
          href={component.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-300 hover:text-white text-sm underline underline-offset-2 transition-colors"
        >
          Ver más detalles
        </a>
        <button
          onClick={() => {
          }}
          className="mt-3 flex items-center justify-center gap-2 rounded-md bg-emerald-800/60 hover:bg-emerald-700/80 px-4 py-2 text-sm text-emerald-200 hover:text-white transition-all cursor-pointer"
        >
          <Trash className="w-4 h-4" />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}
