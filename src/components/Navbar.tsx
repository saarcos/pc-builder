"use client"
import React, { useEffect, useRef, useState } from "react"
import { componentLinks, navLinks } from "../../constants"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
gsap.registerPlugin(ScrollTrigger);
export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname
  const [isOpen, setIsOpen] = useState(false);
  const [componentsOpen, setComponentsOpen] = useState(false);
  const navbarRef = useRef(null);
  const componentsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nav = navbarRef.current;

    ScrollTrigger.create({
      trigger: nav,
      start: 'bottom top',
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 50) {
          gsap.to(nav, {
            backgroundColor: '#0f0f0fbb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            duration: 0.01,
            ease: 'power1.out',
          });
        } else {
          gsap.to(nav, {
            backgroundColor: 'transparent',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
            duration: 0.01,
            ease: 'power2.out',
          });
        }
      },
    });
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentsRef.current &&
        !componentsRef.current.contains(event.target as Node)
      ) {
        setComponentsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 w-full z-50 px-6 sm:px-10 py-4 backdrop-blur-md transition duration-300"
    >
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
          <div className="relative group" ref={componentsRef}>
            <button
              onClick={() => setComponentsOpen(!componentsOpen)}
              className={`transition duration-300 text-lg font-semibold cursor-pointer ${isActive("/pccomponents")
                ? "text-white drop-shadow-[0_0_4px_#22c55e]"
                : "opacity-60 group-hover:opacity-100"
                }`}
            >
              Componentes
            </button>
            {componentsOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40 bg-[#0f0f0fcc] border border-emerald-500/20 shadow-lg rounded-lg p-4 w-[320px] sm:w-[500px] backdrop-blur-md transition">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {componentLinks.map((component) => (
                    <Link
                      onClick={()=>setComponentsOpen(false)}
                      key={component.id}
                      href={component.path}
                      className="flex flex-col items-center text-center text-white hover:text-emerald-300 transition"
                    >
                      <Image
                        src={component.image}
                        alt={component.title}
                        width={80}
                        height={80}
                        className="object-contain mb-1"
                      />
                      <p className="text-sm font-medium">{component.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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
              <SignInButton>
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
