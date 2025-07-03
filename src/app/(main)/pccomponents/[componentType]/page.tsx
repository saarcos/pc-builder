"use client"
import ComponentCard from '@/components/ComponentCard';
import Loading from '@/components/Loading';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { ArrowDownUp, Search } from 'lucide-react';
import React, { startTransition, useEffect, useState } from 'react'
export type Component = {
  _id: string,
  code: string,
  componentType: string,
  image: string,
  lastUpdated: string,
  link: string,
  name: string,
  price: string,
}

export default function ComponentType({ params }: { params: Promise<{ componentType: string }> }) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { componentType } = React.use(params);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('asc');

  const removeComponentById = async (id: string) => {
    const previousComponents = components;
    startTransition(() => {
      setComponents((current) => current.filter(c => c._id !== id));
    });
    try {
      const response = await axios.delete(`/api/components?id=${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error al eliminar componente:", error);
      setComponents(previousComponents);
    }
  };

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/components?componentType=${componentType}&sort=${sortOption}&page=${pageNumber}&limit=20&search=${searchTerm}`);
        const data = await response.data;
        setComponents(data.data);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchComponents();
  }, [componentType, pageNumber, searchTerm, sortOption]);
  
  if (loading) {
    return (
      <Loading/>
    );
  }
  return (
    <div className='p-2 font-inter'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 mb-4'>
        <p className='text-lg text-emerald-300'>{totalItems} items totales</p>
        <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
          <div className='flex items-center gap-2'>
            <ArrowDownUp className='w-4 h-4 text-emerald-400' />
            <span className='text-sm text-white'>Ordenar</span>
            <Select
              value={sortOption}
              onValueChange={(value) => {
                setSortOption(value);
                setPageNumber(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px] border-emerald-500/40 bg-emerald-900/20 text-white">
                <SelectValue>
                  {sortOption === 'desc' ? 'Precio: Mayor a menor' : 'Precio: Menor a mayor'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-emerald-900 text-white border border-emerald-500/40">
                <SelectItem value="desc">Precio: Mayor a menor</SelectItem>
                <SelectItem value="asc">Precio: Menor a mayor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-lg px-2 py-1'>
            <Search className='w-6 h-6 text-emerald-300' />
            <input
              type='text'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'enter') {
                  setSearchTerm(searchInput);
                  setPageNumber(1);
                }
              }}
              placeholder='Busca por nombre'
              className='bg-transparent outline-none text-base placeholder:text-emerald-400 text-white w-full px-1'
            />
            <button
              onClick={() => {
                setSearchTerm(searchInput);
              }}
              className="cursor-pointer text-sm px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {components && components.length > 0 ? components.map((component) => (
          <ComponentCard key={component._id} component={component} onDelete={removeComponentById} />
        )) : null}
      </div>
      <Pagination className="mt-6">
        <PaginationContent>
          {pageNumber > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPageNumber(pageNumber - 1)}
                href="#"
                className='rounded-md bg-emerald-600/30 text-white hover:bg-emerald-500/50 hover:text-white transition-colors'
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
                className='rounded-md bg-emerald-600/30 text-white hover:bg-emerald-500/50 hover:text-white transition-colors'
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
