import React from 'react'
import { Item } from './ComponentContainer'
import Image from 'next/image'
import { Plus } from 'lucide-react'

export default function ItemCard({ item }: { item: Item }) {
    return (
        <div className='flex flex-col bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-xl text-white shadow-md hover:shadow-emerald-500/10 transition-shadow'>
            <div className="relative w-full aspect-[4/3] bg-black/40 rounded overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain"
                />
            </div>

            <div className='flex flex-col gap-1 mt-3'>
                <h3 className='capitalize text-xs font-semibold leading-snug line-clamp-2'>{item.name}</h3>
                <p className='text-emerald-400 text-sm'>{item.price}</p>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-emerald-200 text-xs underline underline-offset-2 transition-colors"
                >
                    Más detalles
                </a>
            </div>

            <button className='cursor-pointer mt-3 flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-md transition-colors w-full text-center'>
                <Plus className='w-4 h-4' />
                <span>Añadir</span>
            </button>
        </div>
    )
}
