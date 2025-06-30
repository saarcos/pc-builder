import { PCBuilderSchema } from "@/features/pcbuilder/schema";
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Item } from "@/app/types/pc-builder";

type BuilderState = Partial<PCBuilderSchema> & {
    filteredComponents: Record<string, Item[]>;
    setFilteredComponents: (data: Record<string, Item[]>) => void;
    setData: (data: Partial<PCBuilderSchema>) => void;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
};

export const usePcBuilderStore = create<BuilderState>()(
    persist(
        (set) => ({
            filteredComponents: {},
            setFilteredComponents: (data) => set({ filteredComponents: data }),
            setData: (data) => set((state) => ({ ...state, ...data })),
            hasHydrated: false,
            setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
        }),
        {
            name: "pc-builder-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
