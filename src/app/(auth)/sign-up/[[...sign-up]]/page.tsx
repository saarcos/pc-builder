'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'

export default function SignUpPage() {
    return (
        <div className="grid w-full flex-grow items-center  px-4 sm:justify-center h-screen">
            <SignUp.Root>
                <SignUp.Step
                    name="start"
                    className="border-[#22c55e] shadow-[0_0_5px_#22c55e] relative isolate w-full space-y-5 rounded-2xl bg-emerald-900 px-4 py-10 ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <h1 className="mt-4 text-lg font-medium tracking-tight text-white font-pressstart drop-shadow-[0_0_5px_#22c55e]">
                            Regístrate en PC Builds
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-400" />
                    <div className="space-y-4">
                        <Clerk.Field name="firstName" className="group/field relative">
                            <Clerk.Label className='absolute left-2 top-0 -translate-y-1/2 bg-emerald-900 px-2 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400 font-pressstart text-[10px]'>Nombre</Clerk.Label>
                            <Clerk.Input
                                type='text'
                                required
                                className='w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400' />
                            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                        </Clerk.Field>
                        <Clerk.Field name="lastName" className="group/field relative">
                            <Clerk.Label className='absolute left-2 top-0 -translate-y-1/2 bg-emerald-900 px-2 text-white before:absolute before:inset-0 before:-z-10 before:bg-black/50 group-focus-within/field:text-emerald-300 group-data-[invalid]/field:text-rose-400 font-pressstart text-[10px]'>Apellido</Clerk.Label>
                            <Clerk.Input
                                type='text'
                                required
                                className='w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-white outline-none ring-1 ring-inset ring-white/20 hover:ring-white/30 focus:shadow-[0_0_6px_0] focus:shadow-emerald-500/20 focus:ring-[1.5px] focus:ring-emerald-300 data-[invalid]:shadow-rose-400/20 data-[invalid]:ring-rose-400' />
                            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
                        </Clerk.Field>
                        <Clerk.Field name="emailAddress" className="group/field relative">
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
                    </div>
                    <SignUp.Captcha className="empty:hidden" />
                    <SignUp.Action
                        submit
                        className="font-inter cursor-pointer relative isolate w-full rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-500 px-3.5 py-2.5 text-center text-sm font-medium text-black shadow-[0_1px_0_0_theme(colors.white/30%)_inset,0_-1px_1px_0_theme(colors.black/5%)_inset] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:text-emerald-900/80 active:before:bg-black/10"
                    >
                        Registrarse
                    </SignUp.Action>
                    <p className="text-center text-sm text-zinc-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Clerk.Link
                            navigate="sign-in"
                            className="font-medium text-white decoration-white/20 underline-offset-4 outline-none hover:underline focus-visible:underline"
                        >
                            ¡Inicia sesión!
                        </Clerk.Link>
                    </p>
                </SignUp.Step>
                <SignUp.Step
                    name="verifications"
                    className="border-[#22c55e] shadow-[0_0_5px_#22c55e] relative isolate w-full space-y-5 rounded-2xl bg-emerald-900 px-4 py-10 ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-black/50 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <h1 className="mt-4 text-xl font-medium tracking-tight text-white">
                            Verificación de código
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-400" />
                    <SignUp.Strategy name="email_code">
                        <Clerk.Field name="code" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium text-white">Email code</Clerk.Label>
                            <Clerk.Input
                                required
                                className="w-full rounded-md bg-neutral-900 px-3.5 py-2 text-sm text-white outline-none ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400" />
                        </Clerk.Field>
                        <SignUp.Action
                            submit
                            className="cursor-pointer relative isolate w-full rounded-md bg-blue-500 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
                        >
                            Finalizar registro
                        </SignUp.Action>
                    </SignUp.Strategy>
                    <p className="text-center text-sm text-zinc-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Clerk.Link
                            navigate="sign-in"
                            className="font-medium text-white decoration-white/20 underline-offset-4 outline-none hover:underline focus-visible:underline"
                        >
                            ¡Inicia sesión!
                        </Clerk.Link>
                    </p>
                </SignUp.Step>
            </SignUp.Root>
        </div>
    )
}