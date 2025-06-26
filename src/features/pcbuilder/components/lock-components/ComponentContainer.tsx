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
import { ArrowDownUp, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(`/api/components?componentType=${component.componentType}&page=${pageNumber}&limit=12`);
                const data = await response.data;
                setItems(data.data);
                setTotalPages(data.totalPages);
                setTotalItems(data.total);
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
    }, [open, component.componentType, pageNumber])
    return (
        <Dialog onOpenChange={setOpen}>
            <div className='flex items-center justify-between p-4 text-sm hover:bg-emerald-500/10 transition-colors border-b border-emerald-400/40 last:border-b-0 font-inter'>
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
                    <DialogTitle className='capitalize text-2xl drop-shadow-[0px_0px_5px_#22c55e] text-emerald-100'>Seleccionar {component.name}</DialogTitle>
                    <DialogDescription className='text-white text-base'>
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
                    <div>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 mt-4 font-inter'>
                            <p className='text-sm text-emerald-300'>{totalItems} items disponibles</p>
                            <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                                {/* Ordenar por */}
                                <div className='flex items-center gap-2'>
                                    <ArrowDownUp className='w-4 h-4 text-emerald-400' />
                                    <span className='text-xs text-white'>Ordenar</span>
                                    <Select>
                                        <SelectTrigger className="w-[180px] border-emerald-500/40 bg-emerald-900/20 text-white">
                                            <SelectValue placeholder="Criterio" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-emerald-900 text-white border border-emerald-500/40">
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="higher">Precio: Mayor a menor</SelectItem>
                                            <SelectItem value="lower">Precio: Menor a mayor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Barra de búsqueda */}
                                <div className='flex items-center gap-2 bg-emerald-900/20 border border-emerald-500/30 rounded-xl px-3 py-1.5'>
                                    <Search className='w-4 h-4 text-emerald-300' />
                                    <input
                                        type='text'
                                        placeholder='Buscar'
                                        className='bg-transparent outline-none text-sm placeholder:text-emerald-400 text-white w-full'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2 grid grid-cols-1 sm:grid-cols-4 gap-2">
                            {items.map(item => (
                                <ItemCard key={item._id} item={item} />
                            ))}
                        </div>
                        <Pagination className="mt-6">
                            <PaginationContent>
                                {pageNumber > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setPageNumber(pageNumber - 1)}
                                            href="#"
                                            className='rounded-md bg-emerald-600/30 text-white hover:bg-emerald-500/50 transition-colors'
                                        />
                                    </PaginationItem>
                                )}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <PaginationItem key={p}>
                                        <PaginationLink
                                            href="#"
                                            isActive={pageNumber === p}
                                            onClick={() => setPageNumber(p)}
                                            className={`rounded-md transition-colors ${pageNumber === p
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-emerald-500/20 hover:bg-emerald-600 hover:text-white text-emerald-100'
                                                }`}
                                        >
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {pageNumber < totalPages && (
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setPageNumber(pageNumber + 1)}
                                            href="#"
                                            className='rounded-md bg-emerald-600/30 text-white hover:bg-emerald-500/50 transition-colors'
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </div>

                )}
            </DialogContent>
        </Dialog>
    )
}
