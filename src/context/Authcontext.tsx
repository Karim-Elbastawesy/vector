'use client'

import React, { createContext, useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { saveAuth, clearAuth } from '@/lib/auth'

interface AuthContextType {
    user: { name: string; email: string; id: string } | null
    token: string | null
    login: (user: { name: string; email: string; token: string; id: string }) => void
    logout: () => void
    isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()

    const isLoggedIn = status === 'authenticated' && !!session

    const user = isLoggedIn
        ? {
            name: session.user?.name ?? '',
            email: session.user?.email ?? '',
            id: (session.user as any)?.id ?? '',
        }
        : null

    const token = isLoggedIn ? ((session as any).userToken ?? null) : null

    const login = (authUser: { name: string; email: string; token: string; id: string }) => {
        saveAuth(authUser)
    }

    const logout = async () => {
        clearAuth()
        await signOut({ redirect: false })
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}