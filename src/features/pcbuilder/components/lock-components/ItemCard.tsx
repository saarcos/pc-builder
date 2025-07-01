import React from 'react'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import { Item } from '@/app/types/pc-builder';
import { LockedComponentType } from './ComponentContainer';

type Props = {
    item: Item,
    onSelect: (type: LockedComponentType, component: Item) => void;
    componentType: LockedComponentType;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLocked: boolean,
}

export default function ItemCard({ item, onSelect, componentType, setOpen, isLocked }: Props) {
    return (
        <div className={`flex flex-col p-3 rounded-xl text-white shadow-md transition-shadow
            ${isLocked
                ? 'border border-emerald-400/60 bg-emerald-900/40 shadow-emerald-500/20 scale-105'
                : 'border border-emerald-500/20 bg-emerald-950/40 hover:shadow-emerald-500/10'
            }`}>
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
                <p className='text-emerald-400 text-sm'>${item.price}</p>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-emerald-200 text-xs underline underline-offset-2 transition-colors"
                >
                    Más detalles
                </a>
            </div>

            <button
                onClick={() => {
                    if (!isLocked) {
                        console.log(componentType)
                        onSelect(componentType, item);
                        setOpen(false);
                    }
                }}
                disabled={isLocked}
                className={`mt-3 flex items-center justify-center gap-1 text-sm px-3 py-1.5 rounded-md w-full text-center transition-colors
                    ${isLocked
                        ? 'bg-emerald-800 text-emerald-300 cursor-default'
                        : 'bg-emerald-700 hover:bg-emerald-600 text-white cursor-pointer'
                    }`}
            >
                {isLocked ? <Check className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
                <span>{isLocked ? 'Añadido' : 'Añadir'}</span>
            </button>
        </div>
    )
}
