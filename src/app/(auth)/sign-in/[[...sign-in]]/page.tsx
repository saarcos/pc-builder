'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

export default function SignInPage() {
    return <div className="relative grid w-full flex-grow items-center px-4 sm:justify-center h-screen">
        <SignIn.Root>
            <SignIn.Step
                name="start"
                className="border-[#22c55e] shadow-[0_0_5px_#22c55e] relative isolate w-full space-y-5 rounded-2xl bg-emerald-900 px-4 py-10 ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
            >
                <header className="text-center">
                    <h1 className="mt-4 text-lg font-medium tracking-tight text-white font-pressstart drop-shadow-[0_0_5px_#22c55e]">
                        Inicia sesión en PC Builds
                    </h1>
                </header>
                <Clerk.GlobalError className="block text-sm text-rose-400" />
                <Clerk.Connection
                    name="google"
                    className="cursor-pointer flex w-full items-center justify-center gap-x-3 rounded-md bg-emerald-700/40 px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70 font-inter"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 16"
                        className="w-4"
                        aria-hidden
                    >
                        <path
                            fill="currentColor"
                            d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                        />
                    </svg>
                    Iniciar con Google
                </Clerk.Connection>
                <Clerk.Field name="identifier" className="group/field relative">
                    <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-emerald-900 px-2 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400 font-pressstart text-[10px]">
                        Correo electrónico
                    </Clerk.Label>
                    <Clerk.Input
                        type="text"
                        required
                        className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
                    />
                    <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                </Clerk.Field>
                <Clerk.Field name="password" className="group/field relative">
                    <Clerk.Label className="absolute left-2 top-0 -translate-y-1/2 bg-emerald-900 px-2 text-[10px] font-pressstart text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400">
                        Contraseña
                    </Clerk.Label>
                    <Clerk.Input
                        type="password"
                        required
                        className="w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400"
                    />
                    <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                </Clerk.Field>
                <SignIn.Action
                    submit
                    className="font-inter cursor-pointer relative isolate w-full rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-500 px-3.5 py-2.5 text-center text-sm font-medium text-black shadow-[0_1px_0_0_theme(colors.white/30%)_inset,0_-1px_1px_0_theme(colors.black/5%)_inset] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:text-emerald-900/80 active:before:bg-black/10"
                >
                    Iniciar sesión
                </SignIn.Action>
                <p className="text-center text-sm text-white/60 font-inter">
                    ¿No tienes una cuenta?{' '}
                    <Clerk.Link
                        navigate="sign-up"
                        className="text-white decoration-white/30 underline-offset-4 outline-none hover:underline focus-visible:underline"
                    >
                        ¡Crea una!
                    </Clerk.Link>
                </p>
            </SignIn.Step>

            <SignIn.Step
                name="verifications"
                className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8"
            >
                <SignIn.Strategy name="email_code">
                    <header className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 40 40"
                            className="mx-auto size-10"
                        >
                            <mask id="a" width="40" height="40" x="0" y="0" maskUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                            </mask>
                            <g fill="#0A0A0A" mask="url(#a)">
                                <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                                <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                            </g>
                        </svg>
                        <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                            Verificación del código
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-600" />
                    <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">Inserta el código</Clerk.Label>
                        <Clerk.Input
                            type="otp"
                            required
                            placeholder="Email code"
                            className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
                        />
                        <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
                    </Clerk.Field>
                    <SignIn.Action
                        submit
                        className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
                    >
                        Continuar
                    </SignIn.Action>
                </SignIn.Strategy>
                <p className="text-center text-sm text-neutral-500">
                    Don&apos;t have an account?{' '}
                    <Clerk.Link
                        navigate="sign-up"
                        className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
                    >
                        Sign up
                    </Clerk.Link>
                </p>
            </SignIn.Step>
        </SignIn.Root>
    </div>
}