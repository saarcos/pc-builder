"use client"
import { Build } from '@/app/types/pc-builder';
import BuildCard from '@/components/builds/BuildCard';
import Loading from '@/components/Loading';
import SectionWrapper from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { PackageOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { startTransition, useEffect, useState } from 'react'

export default function Builds() {
  const router = useRouter();
  const { user } = useUser();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const removeBuildById = async (buildId: string) => {
    const previousBuilds = builds;
    startTransition(() => {
      setBuilds(prev => prev.filter((build) => build._id !== buildId))
    });
    try {
      const result = await axios.delete(`/api/builds/delete-build/${buildId}`);
      console.log(result.data.message);
    } catch (error) {
      setBuilds(previousBuilds);
      console.error('No se pudo eliminar la build: ', error);
    }
  }
  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/builds/get-builds?userId=${user?.id}`);
        console.log(response.data.data)
        setBuilds(response.data.data);
      } catch (error) {
        console.error("Error al cargar builds", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBuilds();
  }, [user]);
  const handleRedirect = () => {
    router.push('/builder')
  }
  if (loading) return <Loading />
  return (
    <SectionWrapper id='mybuilds' title={['Mis', 'Builds', 'Guardadas']}>
      <div className='font-inter'>
        {builds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6 text-white/90">
            <PackageOpen
              width={80}
              height={80}
              className='text-emerald-400'
            />
            <div className="max-w-md">
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-2">
                No tienes builds guardadas
              </h2>
              <p className="text-sm sm:text-base text-white/70">
                Crea tu primera build personalizada para ver un resumen aquí. Podrás revisarla y compartirla en cualquier momento.
              </p>
            </div>
            <Button
              onClick={handleRedirect}
              className="cursor-pointer px-8 py-4 bg-emerald-600 hover:bg-emerald-500 transition-all text-white font-semibold text-sm rounded-lg shadow-lg"
            >
              Crear una build
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {builds.map((build) => (
              <BuildCard key={build._id} build={build} onDelete={removeBuildById}/>
            ))}
          </div>
        )}
      </div>

    </SectionWrapper>
  );
}
