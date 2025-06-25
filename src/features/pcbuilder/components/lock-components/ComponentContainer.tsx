"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import axios from 'axios'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

type Component = {
    name: string,
    componentType: string,
}
type Props = {
    component: Component
}
export type Item = {
    _id: string,
    code: string,
    componentType: string,
    image: string,
    lastUpdated: string,
    link: string,
    name: string,
    price: string,
}
export default function ComponentContainer({ component }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(`/api/components?componentType=${component.componentType}`);
                const data = await response.data;
                setItems(data)
            } catch (error) {
                setError(true);
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        if (open) {
            fetchItems();
        }
    }, [open, component.componentType])
    return (
        <Dialog onOpenChange={setOpen}>
            <div className='flex items-center justify-between p-4 text-sm hover:bg-emerald-500/10 transition-colors border-b border-emerald-400/40 last:border-b-0'>
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
            <DialogContent className='sm:max-w-5xl max-h-[80vh] overflow-y-auto bg-emerald-950/10 backdrop-blur-md border border-emerald-600/30 shadow-md'>
                <DialogHeader>
                    <DialogTitle className='capitalize'>Seleccionar {component.name}</DialogTitle>
                    <DialogDescription>
                        Aquí puedes elegir el componente específico que quieres fijar para tu build.
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <p className="text-red-400 mt-4">
                        Hubo un error al cargar los {component.name}s. Intenta nuevamente.
                    </p>
                )}
                {loading ? (
                    <p className="text-emerald-300 mt-4">Cargando {component.name}s...</p>
                ) : (
                    <div className="mt-4 space-y-2 grid grid-cols-1 sm:grid-cols-4 gap-2">
                        {items.map(item => (
                            <ItemCard key={item._id} item={item}/>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
