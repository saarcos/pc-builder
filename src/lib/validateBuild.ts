import { Item } from "@/app/types/pc-builder";
import { buildTemplates } from "./templates";
type StorageType = 'ssd' | 'hdd';
type CPUBrand = 'intel' | 'amd' | 'any';
type GPUBrand = 'rtx' | 'rx' | 'any';

type InputInitialValidation = {
    usage: 'gaming' | 'render' | 'office-integrated' | 'office-dedicated',
    budget: number,
    components: Item[],
}
type Step2InputValidation = {
    filteredComponents: Record<string, Item[]>,
    preferredCPUBrand: CPUBrand,
    preferredGPUBrand?: GPUBrand,
    preferredStorage: StorageType,
    storageRequirement: number,
}
type ValidationResult = {
    valid: boolean;
    missingComponents: string[];
    filtered: Record<string, Item[]>;
};
function nameCleaner(name: string) {
    return name.toLowerCase().replace(/\s+/g, '');
}
function excludeProcessorsWithoutIGPU(items: Item[]): Item[] {
    return items.filter((processor) => {
        const name = nameCleaner(processor.name);
        return !name.includes('sinvideo') && !name.includes('novideo') && !name.includes('novga');
    });
}
export function validateBuildStep1({
    usage,
    budget,
    components,
}: InputInitialValidation): ValidationResult {
    const template = buildTemplates[usage];
    if (!template) {
        throw new Error("Uso no soportado");
    }
    const grouped = groupByType(components);
    const filtered: Record<string, Item[]> = {};
    const missingComponents: string[] = [];

    if (usage === 'office-integrated' && grouped['processors']) {
        grouped['processors'] = excludeProcessorsWithoutIGPU(grouped['processors'])
    }

    for (const [component, percentage] of Object.entries(template)) {
        const minAcceptablePrice = budget * percentage * 0.2;
        const pool = grouped[component] || [];
        const candidates = pool.filter((c) => c.price >= minAcceptablePrice);
        if (candidates.length === 0) {
            missingComponents.push(component);
        } else {
            filtered[component] = candidates;
        }
    }

    return {
        valid: missingComponents.length === 0,
        missingComponents,
        filtered,
    };
}
const extractStorageCapacity = (name: string): number | null => {
    const cleaned = name.toLowerCase();
    const match = cleaned.match(/(\d+(?:\.\d+)?)(tb|gb)/);
    if (!match) return null;

    let value = parseFloat(match[1]);
    const unit = match[2];

    if (unit === 'tb') value *= 1024;
    return value; // en GB
};

export function validateBuildStep2({
    filteredComponents,
    preferredCPUBrand,
    preferredGPUBrand,
    preferredStorage,
    storageRequirement,
}: Step2InputValidation): ValidationResult {
    const filtered: Record<string, Item[]> = filteredComponents;
    const missingComponents: string[] = [];


    // CPU
    console.log(preferredCPUBrand)
    let cpuPool = filteredComponents['processors'] || [];
    if (preferredCPUBrand !== 'any') {
        cpuPool = cpuPool.filter((cpu) => nameCleaner(cpu.name).includes(preferredCPUBrand));
    }
    if (cpuPool.length === 0) missingComponents.push('processors');
    else filtered['processors'] = cpuPool;
    console.log(cpuPool)

    // GPU
    let gpuPool = filteredComponents['video-cards'] || [];
    if (preferredGPUBrand) {
        if (preferredGPUBrand !== 'any') {
            gpuPool = gpuPool.filter((gpu) => nameCleaner(gpu.name).includes(preferredGPUBrand));
        }
        if (gpuPool.length === 0) missingComponents.push('video-cards');
        else filtered['video-cards'] = gpuPool;
    }

    // Almacenamiento
    let storagePool = filteredComponents['hard-drives'] || [];
    if (preferredStorage === 'ssd') {
        storagePool = storagePool.filter((drive) => nameCleaner(drive.name).includes('ssd'));
    } else {
        storagePool = storagePool.filter((drive) => !nameCleaner(drive.name).includes('ssd'));
    }

    storagePool = storagePool.filter((drive) => {
        const capacity = extractStorageCapacity(drive.name);
        return capacity !== null && capacity <= storageRequirement * 1.2;
    });

    if (storagePool.length === 0) missingComponents.push('hard-drives');
    else filtered['hard-drives'] = storagePool;

    return {
        valid: missingComponents.length === 0,
        missingComponents,
        filtered,
    };
}

function groupByType(components: Item[]) {
    return components.reduce((acc, comp) => {
        if (!acc[comp.componentType]) acc[comp.componentType] = [];
        acc[comp.componentType].push(comp);
        return acc;
    }, {} as Record<string, Item[]>);
}