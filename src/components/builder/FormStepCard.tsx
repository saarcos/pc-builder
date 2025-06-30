import { StepInformation } from '@/app/(main)/builder/page'
import React from 'react'

type Props = {
  step: number
  information: StepInformation
}

export default function FormStepCard({ step, information }: Props) {
  return (
    <div className="relative border border-emerald-500/40 rounded-xl px-5 py-4 bg-black/30 shadow-[0_0_8px_#22c55e33] transition hover:shadow-[0_0_20px_#22c55e66] hover:bg-emerald-200/5">
      <div className="absolute -top-3 left-4 bg-emerald-500/80 text-black font-bold text-xs px-3 py-1 rounded-full shadow-[0_0_5px_#22c55e] font-mono">
        PASO 0{step}
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="text-base sm:text-lg text-emerald-300 font-semibold font-pressstart drop-shadow-[0_0_3px_#22c55e] text-center">
          {information.header}
        </h3>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed font-inter text-center">
          {information.description}
        </p>
      </div>
    </div>
  )
}
