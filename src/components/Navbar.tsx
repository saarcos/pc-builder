"use client"
import React, { useState } from 'react'
import { navLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathName = usePathname()
  const isActive = (path: string) => path === pathName
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-transparent fixed top-0 w-full px-6 sm:px-10 py-4 z-30 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-[0px_0px_10px_#ff0057]">
          PCBuilds
        </Link>

        <div className="hidden sm:flex space-x-6 text-white text-xl">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              key={link.id}
              className={`${
                isActive(link.path)
                  ? 'text-white drop-shadow-[0_0_10px_#ff0057]'
                  : 'opacity-50 hover:opacity-100'
              } transition duration-300`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="sm:hidden z-40">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[#0f0f0f]/95 px-6 py-4 rounded-b-md shadow-lg z-20 backdrop-blur-md transition-all">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            {navLinks.map((link) => (
              <Link
                href={link.path}
                key={link.id}
                className={`${
                  isActive(link.path)
                    ? 'text-white drop-shadow-[0_0_10px_#ff0057]'
                    : 'opacity-60 hover:opacity-100'
                } transition`}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
