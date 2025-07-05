import { Build } from '@/app/types/pc-builder';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
type Props = {
  build: Build,
  onDelete: (buildId: string) => void
}
export default function BuildCard({ build, onDelete }: Props) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const navigateBuildDetails = () => {
    router.push(`/builds/${build._id}`)
  }
  return (
    <div className="relative group rounded-2xl border border-emerald-600/30 bg-emerald-900/30 hover:shadow-emerald-400/20 hover:shadow-xl transition-all duration-300 overflow-hidden font-inter" onClick={() => setIsClicked(!isClicked)}>
      <div className={`absolute inset-0 flex items-center justify-center ${isClicked ? 'opacity-100 scale-100 ' : 'opacity-0'} scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out z-10 bg-emerald-950/70 backdrop-blur-md`}>
        <div className='flex flex-col gap-2'>
          <button onClick={navigateBuildDetails} className="bg-emerald-800/90 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-emerald-700/80 hover:text-white transition duration-200 cursor-pointer">
            Ver detalles
          </button>
          <button onClick={()=>{
            onDelete(build._id)
          }} className="mt-3 flex items-center justify-center gap-2 rounded-md bg-emerald-500/50 hover:bg-emerald-700/80 px-4 py-2 text-white hover:text-white transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
      <div className="relative w-full aspect-[4/3] bg-emerald-500/10">
        <Image
          src="/images/pc-gaming.webp"
          alt={build.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-contain p-6"
        />
      </div>
      <div className="p-4 space-y-2 z-0">
        <h2 className="text-base font-bold text-white mb-1">{build.name}</h2>
        <div className="text-sm space-y-1">
          <p className="text-emerald-400 font-medium">
            Propósito: <span className="text-white/90 font-normal capitalize">{build.usage}</span>
          </p>
          <p className="text-white/80">Presupuesto: ${build.budget}</p>
          <p className="text-white/80">Costo total: ${build.totalPrice}</p>
          <p className="text-white/60 text-xs">
            {build.components.length} componente{build.components.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
