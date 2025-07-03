"use client"
import React, { useEffect, useState } from 'react'
import { Item } from '@/app/types/pc-builder'
import Image from 'next/image'
import { Plus, Save } from 'lucide-react'
import { usePCBuilderData } from '@/hooks/usePcBuilderData'
import Loading from '@/components/Loading'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type ComponentSchema = {
    id: string,
    name: string,
}

type Build = {
    processor: ComponentSchema,
    motherboard: ComponentSchema,
    videoCard?: ComponentSchema,
    memory: ComponentSchema,
    storage: ComponentSchema,
    psu: ComponentSchema,
    cooler?: ComponentSchema
}
type SavedComponent = {
    type: keyof Build,
    data: Item,
}

export default function Preview() {
    const router = useRouter();
    const [build, setBuild] = useState<Build>();
    const [componentsData, setComponentsData] = useState<Record<string, Item>>({});
    const [buildPrice, setBuildPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const iconMapper: Record<keyof Build, { name: string; icon: string }> = {
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
            const b: Build = parsed.build;
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
                setBuildPrice(cost);
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
            type: key as keyof Build,
            data: componentsData[comp!.id], // snapshot del componente
        }));
    const saveBuild = async () => {
        try {
            if (!usage || !budget || savedComponents.length === 0) {
                alert("No se puede guardar la build. Faltan datos.");
                return;
            }
            setSaving(true);
            const buildData = {
                usage,
                budget: Number(budget),
                totalPrice: buildPrice,
                components: savedComponents.map(c => ({
                    type: c.type,
                    componentId: c.data._id,
                    name: c.data.name,
                    image: c.data.image,
                    price: c.data.price,
                    link: c.data.link
                }))
            };

            const response = await axios.post('/api/save-build', buildData);

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
        <div className="text-white p-6 sm:p-10">
            <h1 className="text-2xl font-bold mb-6 font-pressstart text-center drop-shadow-[0_0_10px_#22c55e]">Vista previa de tu build</h1>
            <div className='flex flex-col sm:flex-row items-stretch gap-4'>
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
                                const label = iconMapper[key as keyof Build];
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
                <div className='bg-emerald-950/20 border border-emerald-500/10 backdrop-blur-sm rounded-xl px-6 py-4 w-full sm:w-72 shadow-md flex flex-col gap-2'>
                    <div className="flex flex-col gap-4 flex-1">
                        <button className="cursor-pointer p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-medium flex items-center gap-2 justify-center">
                            <Plus className="w-5 h-5" />
                            Generar otra build
                        </button>

                        <div className="border-t border-emerald-500/20 pt-4 flex flex-col gap-3 text-sm text-white/90">
                            <div>
                                <p className="text-xs uppercase text-white/60">Propósito</p>
                                <p className="font-semibold text-emerald-400">{usage}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-white/60">Presupuesto</p>
                                <p className="font-semibold text-emerald-400">${budget}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-white/60">Costo total</p>
                                <p className="font-semibold text-emerald-400">${buildPrice}</p>
                            </div>
                        </div>
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
            </div>
        </div>
    );
}
