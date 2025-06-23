"use client"
import React, { useState } from "react"
import { navLinks } from "../../constants"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md px-6 sm:px-10 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-pressstart text-white drop-shadow-[0_0_6px_#22c55e]"
        >
          PCBuilds
        </Link>
        <div className="hidden sm:flex items-center space-x-6 text-white font-inter">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              key={link.id}
              className={`transition duration-300 text-lg font-semibold ${isActive(link.path)
                ? "text-white drop-shadow-[0_0_4px_#22c55e]"
                : "opacity-60 hover:opacity-100"
                }`}
            >
              {link.title}
            </Link>
          ))}
          <SignedOut>
            <SignInButton>
              <button className="border border-[#22c55e] shadow-[0_0_5px_#22c55e] hover:shadow-[0_0_10px_#22c55e] text-white text-lg px-4 py-1 rounded-md transition cursor-pointer font-inter">
                Iniciar sesión
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'ring-2 ring-green-500 [&>img]:grayscale-0 [&>img]:saturate-150',
                },
              }}
            />
          </SignedIn>
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 px-6">
          <div className="rounded-lg bg-[#0f0f0f]/95 p-4 space-y-4 shadow-lg transition-all">
            {navLinks.map((link) => (
              <Link
                href={link.path}
                key={link.id}
                onClick={() => setIsOpen(false)}
                className={`block text-white text-base font-medium transition ${isActive(link.path)
                  ? "text-white drop-shadow-[0_0_6px_#22c55e]"
                  : "opacity-70 hover:opacity-100"
                  }`}
              >
                {link.title}
              </Link>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="mt-2 w-full border border-white text-white text-sm py-2 rounded-md transition hover:bg-white hover:text-black">
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}
