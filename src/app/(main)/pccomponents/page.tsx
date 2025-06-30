"use client"
import ComponentCard from '@/components/ComponentCard';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import gsap from 'gsap';
import { Cog } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
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
export default function Components() {
  const [components, setComponents] = useState<Component[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef(null);
  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/components');
        const data = await response.data;
        setComponents(data.data);
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchComponents();
  }, []);
  useGSAP(() => {
    if (loading && loaderRef.current) {
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [loading]);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4" ref={loaderRef}>
          <Cog className="w-24 h-24 animate-spin text-emerald-500 drop-shadow-[0_0_15px_#22c55e]" />
          <p className="text-xl font-bold animate-pulse text-emerald-400 text-center">Cargando componentes...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 px-4">
      {components && components.length > 0 ? components.map((component) => (
        <ComponentCard key={component._id} component={component} />
      )) : null}
    </div>
  )
}
