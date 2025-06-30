import { usePcBuilderStore } from "@/app/(main)/builder/store";

export function usePCBuilderData() {
  const usage = usePcBuilderStore((state) => state.usage);
  const budget = usePcBuilderStore((state) => state.budget);
  const preferredCPUBrand = usePcBuilderStore((state) => state.preferredCPUBrand);
  const preferredGPUBrand = usePcBuilderStore((state) => state.preferredGPUBrand);
  const preferredStorage = usePcBuilderStore((state) => state.preferredStorage);
  const storageRequirement = usePcBuilderStore((state) => state.storageRequirement);
  const lockedComponentsData = usePcBuilderStore((state) => state.lockedComponents);

  return {
    usage,
    budget,
    preferredCPUBrand,
    preferredGPUBrand,
    preferredStorage,
    storageRequirement,
    lockedComponentsData,
  };
}
