import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  urlPath: string
  selected: boolean
  onClick: () => void
  hasError: boolean
}

export default function ComponentCard({ name, urlPath, selected, onClick, hasError }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl w-full transition-all duration-300 cursor-pointer",
        "bg-black/30 hover:bg-emerald-200/10 shadow-md hover:shadow-lg border",
        selected ? "border-emerald-500 shadow-[0_0_5px_#22c55e] text-emerald-300" : "border-transparent text-white",
        hasError && "border-destructive bg-destructive/10"
      )}
    >
      <Image
        src={`${urlPath}`}
        alt={name}
        width={80}
        height={80}
        className="object-contain w-auto"
      />
      <h2 className="text-center font-medium text-sm sm:text-base">
        {name}
      </h2>
    </button>
  )
}
