import type { Metadata } from "next";
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger, SplitText)


export const metadata: Metadata = {
  title: "PC Builder",
  description: "A PC Builder powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
        <body className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#2b1f22] to-[#88353c] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
