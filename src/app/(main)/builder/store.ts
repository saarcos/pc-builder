import { PCBuilderSchema } from "@/features/pcbuilder/schema";
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type BuilderState = Partial<PCBuilderSchema> & {
    setData: (data: Partial<PCBuilderSchema>) => void;
};

export const usePcBuilderStore = create<BuilderState>()(
    persist(
        (set) => ({
            setData: (data) => set((state) => ({ ...state, ...data })),
        }),
        {
            name: "pc-builder-storage", 
        }
    )
);
