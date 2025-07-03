"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Search, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import ItemCard from './ItemCard';

import { Component, Item } from '@/app/types/pc-builder'

export type LockedComponentType = "processors" | "video-cards" | "memory" | "hard-drives" | "motherboards";

type Props = {
    component: Component;
    onSelect: (type: LockedComponentType, component: Item) => void;
    onDelete: (type: LockedComponentType) => void;
    lockedValue?: Item,
    filteredItems: Item[];
}


export default function ComponentContainer({ component, onSelect, lockedValue, onDelete, filteredItems }: Props) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const searchedItems = filteredItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <div className='p-4 text-sm hover:bg-emerald-500/10 transition-colors border-b border-emerald-400/40 last:border-b-0 font-inter'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-emerald-100'>
                        <Image src={`/icons/${component.name}.svg`} alt={component.name} width={20} height={20} />
                        <span className='font-medium tracking-wide capitalize'>{component.name}</span>
                    </div>
                    <DialogTrigger asChild>
                        <button className='cursor-pointer flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors'>
                            <Plus className='w-4 h-4' />
                            <p>Añadir <span className='capitalize'>{component.name}</span></p>
                        </button>
                    </DialogTrigger>
                </div>
                {lockedValue && (
                    <div className='flex items-center justify-between mt-3 p-3 bg-darkgray/30 border border-emerald-500/30 rounded-lg shadow-inner'>
                        <div className='flex items-center gap-3'>
                            <div className='relative w-[60px] h-[60px] rounded overflow-hidden shadow'>
                                <Image
                                    src={lockedValue.image}
                                    alt={lockedValue.name}
                                    fill
                                    sizes="(max-width: 640px) 50px, (max-width: 1024px) 50px, 50px"
                                    className='object-fill p-1 w-auto'
                                />
                            </div>
                            <div className='flex flex-col text-xs sm:text-sm'>
                                <h3 className='font-semibold text-emerald-100 truncate max-w-[200px] sm:max-w-[400px]'>{lockedValue.name}</h3>
                                <p className='text-emerald-300'>{lockedValue.price}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onDelete(component.componentType as LockedComponentType)}
                            className='cursor-pointer p-2 rounded-full hover:bg-emerald-700/30 transition-colors text-emerald-300 hover:text-emerald-300/60'
                            aria-label="Quitar componente"
                        >
                            <X className='w-5 h-5' />
                        </button>
                    </div>
                )}

            </div>

            <DialogContent className='sm:max-w-5xl max-h-[80vh] overflow-y-auto bg-emerald-950/10 backdrop-blur-md border border-emerald-600/30 shadow-md'>
                <DialogHeader>
                    <DialogTitle className='capitalize text-2xl drop-shadow-[0px_0px_5px_#22c55e] text-emerald-100'>Seleccionar {component.name}</DialogTitle>
                    <DialogDescription className='text-white text-base'>
                        Aquí puedes elegir el componente específico que quieres fijar para tu build.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 mt-4 font-inter'>
                        <p className='text-sm text-emerald-300'>{searchedItems.length} items disponibles</p>
                        <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                            <div className='flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-lg px-2 py-1'>
                                <Search className='w-5 h-5 text-emerald-300' />
                                <input
                                    type='text'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder='Busca por nombre'
                                    className='bg-transparent outline-none text-sm placeholder:text-emerald-400 text-white w-full px-1'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {searchedItems.length > 0 ? (
                            searchedItems.map(item => (
                                <ItemCard key={item._id} item={item} onSelect={onSelect} componentType={component.componentType as LockedComponentType} setOpen={setOpen} isLocked={lockedValue?._id === item._id} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center text-center text-emerald-200 py-10 border border-emerald-500/20 rounded-lg bg-emerald-900/10">
                                <h2 className="text-lg font-semibold">Sin resultados</h2>
                                <p className="text-sm text-emerald-400 mt-1">
                                    No se encontraron componentes con los criterios actuales.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
