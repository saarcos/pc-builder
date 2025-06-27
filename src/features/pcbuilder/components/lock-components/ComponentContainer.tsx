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
import { Plus, Search, X } from 'lucide-react'
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
import { Component, Item } from '@/app/types/pc-builder'

type Props = {
    component: Component;
    onSelect: (type: "cpu" | "gpu" | "ram" | "storage" | "motherboard", component: Item) => void;
    onDelete: (type: "cpu" | "gpu" | "ram" | "storage" | "motherboard") => void;
    lockedValue?: Item,
}

export default function ComponentContainer({ component, onSelect, lockedValue, onDelete}: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(`/api/components?componentType=${component.componentType}&page=${pageNumber}&limit=12&search=${searchTerm}`);
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
    }, [open, component.componentType, pageNumber, searchTerm])
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
                            onClick={()=>onDelete(component.name as "cpu" | "gpu" | "ram" | "storage" | "motherboard" )}
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
                                <div className='flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-lg px-2 py-1'>
                                    <Search className='w-5 h-5 text-emerald-300' />
                                    <input
                                        type='text'
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setSearchTerm(searchInput);
                                                setPageNumber(1);
                                            }
                                        }}
                                        placeholder='Busca por nombre'
                                        className='bg-transparent outline-none text-sm placeholder:text-emerald-400 text-white w-full px-1'
                                    />
                                    <button
                                        onClick={() => {
                                            setSearchTerm(searchInput);
                                            setPageNumber(1);
                                        }}
                                        className="text-xs px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-colors"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {items.length > 0 ? (
                                items.map(item => (
                                    <ItemCard key={item._id} item={item} onSelect={onSelect} componentName={component.name as "cpu" | "gpu" | "ram" | "storage" | "motherboard"} setOpen={setOpen} isLocked={lockedValue?._id === item._id} />
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
