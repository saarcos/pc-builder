import type { Metadata } from "next";
import "./globals.css";
import { Inter, Press_Start_2P } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
    title: "PC Builder",
    description: "A PC Builder powered by AI",
};
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const pressStart2P = Press_Start_2P({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-pressstart",
});
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{
            baseTheme: [dark],
        }}>
            <html lang="en">
                <head />
                <body className={`min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#10241d] to-[#065f46] text-white font-sans ${inter.variable} ${pressStart2P.variable}`}>
                    {children}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            className: 'bg-emerald-900 border border-emerald-500 text-white shadow-lg',
                            style: {
                                fontFamily: 'var(--font-inter)',
                                fontSize: '0.875rem',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                            },
                        }}
                    />
                </body>
            </html>
        </ClerkProvider>

    );
}
