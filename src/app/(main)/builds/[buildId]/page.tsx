import { Build, BuildAI } from "@/app/types/pc-builder";
import { getBuildById } from "@/lib/mongodb";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BuildDetails({ params }: { params: Promise<{ buildId: string }> }) {

    const { buildId } = await params;
    const build: Build | null = await getBuildById(buildId);
    const iconMapper: Record<keyof BuildAI, { name: string; icon: string }> = {
        processor: { name: 'Procesador', icon: '/icons/cpu.svg' },
        motherboard: { name: 'Placa madre', icon: '/icons/motherboard.svg' },
        videoCard: { name: 'Tarjeta de video', icon: '/icons/gpu.svg' },
        memory: { name: 'RAM', icon: '/icons/ram.svg' },
        storage: { name: 'Almacenamiento', icon: '/icons/storage.svg' },
        psu: { name: 'Fuente de poder', icon: '/icons/power-supply.svg' },
        cooler: { name: 'Cooler', icon: '/icons/cooler.svg' },
    };
    return (
        <div className="text-white p-6 sm:p-10">
            <h1 className="text-2xl font-bold mb-6 font-pressstart text-center drop-shadow-[0_0_10px_#22c55e]">{build?.name}</h1>
            <div className='flex flex-col lg:flex-row items-stretch gap-4'>
                <div className="bg-emerald-950/20 border border-emerald-500/10 backdrop-blur-sm rounded-xl overflow-hidden flex-1">
                    <table className="w-full text-sm sm:text-base font-inter text-white/90">
                        <thead className="bg-emerald-800/30 border-b border-emerald-500/20 text-left">
                            <tr>
                                <th className="p-4 hidden sm:block text-center">Componente</th>
                                <th className="p-4 text-center">Producto</th>
                                <th className="p-4 hidden sm:block text-center">Tienda</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {build?.components.map((component) => {
                                const label = iconMapper[component.type as keyof BuildAI]
                                return (
                                    <tr key={component.componentId} className="border-b border-white/10 hover:bg-emerald-700/10 transition-colors">
                                        <td className="hidden sm:block p-4 capitalize text-white font-medium">
                                            <div className='flex items-center justify-center gap-2'>
                                                <Image src={label.icon} alt={label.name} width={30} height={30} />
                                                <span>{label.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={component.image}
                                                    alt={component.name}
                                                    width={70}
                                                    height={70}
                                                    className="object-contain bg-white p-1 rounded-md shadow"
                                                />
                                                <div className='text-xs sm:text-sm'>
                                                    <p className="font-semibold text-white leading-snug">{component.name}</p>
                                                    <p className="text-emerald-400 font-bold mt-1">${component.price}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:flex sm:items-center sm:justify-center">
                                            <Image
                                                src="/images/tecnomega.png"
                                                alt="tecnomega_logo"
                                                width={80}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </td>
                                        <td className="p-4 text-right">
                                            <a
                                                href={component.link}
                                                target="_blank"
                                                className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all"
                                            >
                                                Comprar
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-500/10 backdrop-blur-sm rounded-2xl px-6 py-6 w-full sm:w-80 shadow-lg flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <Link href="/builder">
                            <button className="cursor-pointer w-full p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-semibold text-sm flex items-center gap-2 justify-center shadow-md">
                                <Plus className="w-5 h-5" />
                                Generar otra build
                            </button>
                        </Link>
                    </div>

                    <div className="border-t border-emerald-500/20 pt-4 flex flex-col gap-4 text-sm text-white/90">
                        <div className="flex items-center justify-between">
                            <span className="text-white/60 text-xs uppercase">Propósito</span>
                            <span className="font-semibold text-emerald-400 capitalize">{build?.usage}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/60 text-xs uppercase">Presupuesto</span>
                            <span className="font-semibold text-emerald-400">${build?.budget}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-3">
                            <span className="text-white/60 text-xs uppercase">Costo total</span>
                            <span className="font-bold text-emerald-300">${build?.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
