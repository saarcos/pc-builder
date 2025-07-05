"use client"
import React, { useEffect, useState } from 'react'
import { BuildAI, Item } from '@/app/types/pc-builder'
import Image from 'next/image'
import { Plus, Save } from 'lucide-react'
import { usePCBuilderData } from '@/hooks/usePcBuilderData'
import Loading from '@/components/Loading'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUser } from '@clerk/nextjs'

type SavedComponent = {
    type: keyof BuildAI,
    data: Item,
}

export default function Preview() {
    const { user } = useUser();
    const router = useRouter();
    const [build, setBuild] = useState<BuildAI>();
    const [componentsData, setComponentsData] = useState<Record<string, Item>>({});
    const [buildPrice, setBuildPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [buildName, setBuildName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const iconMapper: Record<keyof BuildAI, { name: string; icon: string }> = {
        processor: { name: 'Procesador', icon: '/icons/cpu.svg' },
        motherboard: { name: 'Placa madre', icon: '/icons/motherboard.svg' },
        videoCard: { name: 'Tarjeta de video', icon: '/icons/gpu.svg' },
        memory: { name: 'RAM', icon: '/icons/ram.svg' },
        storage: { name: 'Almacenamiento', icon: '/icons/storage.svg' },
        psu: { name: 'Fuente de poder', icon: '/icons/power-supply.svg' },
        cooler: { name: 'Cooler', icon: '/icons/cooler.svg' },
    };
    const { usage, budget } = usePCBuilderData();
    useEffect(() => {
        const data = localStorage.getItem('generatedBuild');
        if (data) {
            const parsed = JSON.parse(data);
            const b: BuildAI = parsed.build;
            setBuild(b);

            const ids = Object.values(b)
                .filter(Boolean)
                .map(comp => comp.id);

            Promise.all(
                ids.map(id =>
                    fetch(`/api/components/${id}`).then(res => res.json())
                )
            ).then(results => {
                const resultMap: Record<string, Item> = {};
                const cost = results.reduce((acc, item) => {
                    resultMap[item._id] = item;
                    return acc + item.price;
                }, 0);
                setComponentsData(resultMap);
                setBuildPrice(cost.toFixed(2));
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <Loading />;
    if (!build) return <div className="text-white p-6">No se encontró ninguna build generada.</div>;

    const savedComponents: SavedComponent[] = Object.entries(build)
        .filter(([_, comp]) => comp) // eliminar campos undefined como `videoCard` o `cooler`
        .map(([key, comp]) => ({
            type: key as keyof BuildAI,
            data: componentsData[comp!.id], // snapshot del componente
        }));
    const saveBuild = async () => {
        try {
            if (buildName === '' || !usage || !budget || savedComponents.length === 0) {
                alert("No se puede guardar la build. Faltan datos.");
                return;
            }
            if (!user || !user.id) {
                alert("Debes iniciar sesión para guardar una build.");
                return;
            }
            setSaving(true);
            const buildData = {
                userId: user.id,
                name: buildName,
                usage,
                budget: Number(budget),
                totalPrice: Number(buildPrice),
                components: savedComponents.map(c => ({
                    type: c.type,
                    componentId: c.data._id,
                    name: c.data.name,
                    image: c.data.image,
                    price: c.data.price,
                    link: c.data.link
                }))
            };

            const response = await axios.post('/api/builds/save-build', buildData);

            if (response.status === 201) {
                alert("Build guardada exitosamente 🎉");
                localStorage.removeItem("generatedBuild");
                localStorage.removeItem("pc-builder-storage");
                router.push('/builds')

            } else {
                console.error("Respuesta inesperada", response);
                alert("Ocurrió un error al guardar la build.");
            }
        } catch (error) {
            console.error("Error al guardar la build:", error);
            alert("Error inesperado al guardar la build.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
            <div className="text-white p-6 sm:p-10">
                <h1 className="text-2xl font-bold mb-6 font-pressstart text-center drop-shadow-[0_0_10px_#22c55e]">Vista previa de tu build</h1>
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
                                {Object.entries(build).map(([key, comp]) => {
                                    if (!comp) return null;
                                    const item = componentsData[comp.id];
                                    if (!item) return null;
                                    const label = iconMapper[key as keyof BuildAI];
                                    return (
                                        <tr key={comp.id} className="border-b border-white/10 hover:bg-emerald-700/10 transition-colors">
                                            <td className="hidden sm:block p-4 capitalize text-white font-medium">
                                                <div className='flex items-center justify-center gap-2'>
                                                    <Image src={label.icon} alt={label.name} width={30} height={30} />
                                                    <span>{label.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={70}
                                                        height={70}
                                                        className="object-contain bg-white p-1 rounded-md shadow"
                                                    />
                                                    <div className='text-xs sm:text-sm'>
                                                        <p className="font-semibold text-white leading-snug">{item.name}</p>
                                                        <p className="text-emerald-400 font-bold mt-1">${item.price}</p>
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
                                                    href={item.link}
                                                    target="_blank"
                                                    className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all"
                                                >
                                                    Comprar
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-500/10 backdrop-blur-sm rounded-2xl px-6 py-6 w-full sm:w-80 shadow-lg flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <button onClick={()=>router.push('/builder')} className="cursor-pointer w-full p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-semibold text-sm flex items-center gap-2 justify-center shadow-md">
                                <Plus className="w-5 h-5" />
                                Generar otra build
                            </button>

                            <DialogTrigger asChild>
                                <button className="cursor-pointer w-full p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition-colors text-white font-semibold text-sm flex items-center gap-2 justify-center shadow-md">
                                    <Save className="w-5 h-5" />
                                    Guardar build
                                </button>
                            </DialogTrigger>
                        </div>

                        <div className="border-t border-emerald-500/20 pt-4 flex flex-col gap-4 text-sm text-white/90">
                            <div className="flex items-center justify-between">
                                <span className="text-white/60 text-xs uppercase">Propósito</span>
                                <span className="font-semibold text-emerald-400 capitalize">{usage}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-white/60 text-xs uppercase">Presupuesto</span>
                                <span className="font-semibold text-emerald-400">${budget}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/10 pt-3">
                                <span className="text-white/60 text-xs uppercase">Costo total</span>
                                <span className="font-bold text-emerald-300">${buildPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogContent className="sm:max-w-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-600/30 shadow-md font-inter">
                <DialogHeader>
                    <DialogTitle className='text-xl mb-1'>Dale un nombre a tu build</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <div className='group/field relative mb-2'>
                        <p className='absolute left-2 top-0 -translate-y-1/2 bg-emerald-900 px-2 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 font-pressstart text-[10px]'>Nombre</p>
                        <input type='text' value={buildName} onChange={(e) => setBuildName(e.target.value)} placeholder='PC Gaming 1440p' className='w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20' />
                    </div>
                    <button
                        onClick={saveBuild}
                        disabled={saving}
                        className={`cursor-pointer p-2 rounded-lg transition-colors text-white font-medium flex items-center gap-2 justify-center ${saving ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'
                            }`}
                    >
                        <Save className="w-5 h-5" />
                        {saving ? "Guardando..." : "Guardar build"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>

    );
}
