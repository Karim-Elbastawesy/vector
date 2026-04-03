'use client'

import { IdCardIcon, Mail, Phone, LogOut, ShoppingBag, Heart, User, Crown } from 'lucide-react'
import React from 'react'
import { useAuth } from '../../context/Authcontext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/toast'

export default function Page() {
    const isPremium = Math.random() > 0.5;

    const { user, isLoggedIn, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        showToast({ title: "Signed out", message: "You have been logged out.", type: "info" })
        router.push('/')
    }

    if (!isLoggedIn || !user) {
        return (
            <div className="max-w-md mx-auto px-4 py-24 text-center">
                <User className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">You're not signed in</h2>
                <p className="text-gray-500 mb-6">Sign in to view your profile.</p>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                    Sign in
                </Link>
            </div>
        )
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden mb-5">
                <div className="p-8 pb-8">
                    <div className="flex items-end justify-between mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-amber-500 border-4 border-white flex items-center justify-center shadow-md">
                            <User height={30} width={30} />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                        {isPremium && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-600 border border-amber-300">
                                <Crown size={12} />
                                PREMIUM
                            </span>
                        )}
                    </div>
                    <p className="text-gray-400 text-sm">VECTOR member</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mb-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Info</p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                            <IdCardIcon className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Full Name</p>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Email</p>
                            <p className="font-semibold text-gray-800">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Link
                    href="/cart"
                    className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 flex items-center gap-4 hover:border-amber-300 hover:shadow-md transition-all group"
                >
                    <div className="w-11 h-11 bg-amber-50 group-hover:bg-amber-400 rounded-2xl flex items-center justify-center transition-colors shrink-0">
                        <ShoppingBag className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 text-sm">My Cart</p>
                        <p className="text-xs text-gray-400">View items</p>
                    </div>
                </Link>

                <Link
                    href="/wishlist"
                    className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 flex items-center gap-4 hover:border-red-200 hover:shadow-md transition-all group"
                >
                    <div className="w-11 h-11 bg-red-50 group-hover:bg-red-500 rounded-2xl flex items-center justify-center transition-colors shrink-0">
                        <Heart className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 text-sm">Wishlist</p>
                        <p className="text-xs text-gray-400">Saved items</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}