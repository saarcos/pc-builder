import { Component } from '@/app/pccomponents/page'
import Image from 'next/image'
import React from 'react'

type Props = {
  component: Component
}

export default function ComponentCard({ component }: Props) {
  return (
    <div className="bg-black/30 rounded-lg overflow-hidden shadow-md border border-white/10">
      {/* Imagen con contenedor fijo y relación de aspecto */}
      <div className="relative w-full aspect-[4/3] bg-black">
        <Image
          src={component.image}
          alt={component.name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 text-white">
        <h2 className="font-semibold text-lg">{component.name}</h2>
      </div>
    </div>
  )
}
