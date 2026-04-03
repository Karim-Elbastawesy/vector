'use client'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Zap, Shield, Headphones, Star } from 'lucide-react'
import { loginSchema, loginSchemaType } from '../schema/login.schema'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
    const router = useRouter()

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    })

    const [loading, setLoading] = useState(false)

    const handleLogin = async (data: loginSchemaType) => {
        setLoading(true)
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (res?.error) {
                showToast({ title: "Login Failed", message: "Invalid email or password.", type: "error" })
                return
            }

            showToast({ title: "Welcome back!", message: "You have been signed in.", type: "success" })
            router.push('/')
        } catch {
            showToast({ title: "Login Failed", message: "Something went wrong.", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    const inputClass = "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-amber-400 transition-colors placeholder:text-gray-400"

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center px-12">
                <div className="absolute inset-0 bg-amber-400 [background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.3),transparent)]" />
                <div className="absolute inset-0 [background-image:radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
                <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full bg-amber-300/40 blur-3xl" />
                <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 rounded-full bg-orange-300/30 blur-3xl" />

                <div className="relative z-10 text-gray-900 max-w-sm text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
                            <ShoppingBag className="w-10 h-10 text-gray-900" />
                        </div>
                    </div>
                    <Link href='/'>
                        <h2 className="text-4xl font-black tracking-tight mb-3">VECTOR</h2>
                    </Link>
                    <p className="text-gray-800 text-lg font-medium mb-10 leading-relaxed">Welcome back. Thousands of products are waiting for you.</p>
                    <div className="flex flex-col gap-4 text-left">
                        {[
                            { icon: Zap, title: "Lightning Fast Delivery", desc: "Get your orders in record time" },
                            { icon: Shield, title: "Secure Payments", desc: "Your transactions are always protected" },
                            { icon: Headphones, title: "24/7 Support", desc: "We're here whenever you need us" },
                            { icon: Star, title: "Top Rated Products", desc: "Curated selection of quality items" },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-center gap-4 bg-white/25 backdrop-blur-sm rounded-2xl px-4 py-3">
                                <div className="bg-white/40 rounded-xl p-2 shrink-0">
                                    <Icon className="w-5 h-5 text-gray-900" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-gray-900">{title}</p>
                                    <p className="text-xs text-gray-700">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 relative bg-white">
                <div className="absolute inset-0 bg-white [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
                <div className="relative z-10 w-full max-w-md">
                    <div className="mb-8">
                        <Link href="/" className="text-2xl font-black tracking-tight text-gray-900">VECTOR</Link>
                        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-1">Welcome back</h1>
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-amber-500 font-semibold hover:text-amber-600 transition-colors">Sign up</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FieldGroup className="flex flex-col gap-4">
                            <Controller name="email" control={control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1 block">Email</FieldLabel>
                                    <Input {...field} id="email" type="email" aria-invalid={fieldState.invalid} placeholder="Enter your email" autoComplete="off" className={inputClass} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />

                            <Controller name="password" control={control} render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1 block">Password</FieldLabel>
                                    <Input {...field} id="password" type="password" aria-invalid={fieldState.invalid} placeholder="Enter your password" autoComplete="off" className={inputClass} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                        </FieldGroup>

                        <div className="flex justify-end mt-2">
                            <Link href="/register" className="text-xs text-amber-500 hover:text-amber-600 transition-colors font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" disabled={loading} className="mt-6 w-full py-6 text-xl rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}