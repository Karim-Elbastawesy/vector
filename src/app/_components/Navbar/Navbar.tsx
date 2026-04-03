'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { ShoppingCart, Heart, LogOut, User, ChevronDown, Menu, Package, MapPin } from "lucide-react"
import { useAuth } from "../../../context/Authcontext"
import { showToast } from "@/lib/toast"
import { getCartApi } from "@/app/apis/cart/addCart.api"
import { getWishlistApi } from "../../apis/wishlist/wishlist.api"

const AUTH_ROUTES = ['/login', '/register']

export function NavigationMenuDemo() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, isLoggedIn, logout, token } = useAuth()
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [cartCount, setCartCount] = React.useState(0)
    const [wishCount, setWishCount] = React.useState(0)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    const links = [
        { path: "/", element: 'Home' },
        { path: "/categories", element: 'Categories' },
        { path: "/brands", element: 'Brands' },
        { path: "/contact", element: 'Contact' },
    ]

    const auth = [
        { path: "/login", element: 'Login' },
        { path: "/register", element: 'Register' },
    ]

    React.useEffect(() => {
        if (!isLoggedIn || !token) { setCartCount(0); setWishCount(0); return }
        getCartApi(token).then(data => setCartCount(data?.data?.products?.length ?? 0)).catch(() => { })
        getWishlistApi(token).then(data => setWishCount(data?.data?.length ?? 0)).catch(() => { })
    }, [isLoggedIn, token, pathname])

    React.useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        logout()
        setDropdownOpen(false)
        setCartCount(0)
        setWishCount(0)
        showToast({ title: "Signed out", message: "You have been logged out.", type: "info" })
        router.push('/')
    }

    if (AUTH_ROUTES.includes(pathname)) return null

    return (
        <header className="flex justify-between items-center w-full px-6 md:px-20 py-4 bg-amber-300 sticky top-0 z-40 shadow-sm">

            <div className="flex-1 flex items-center">

                <nav className="hidden md:flex items-center gap-1">
                    {links.map(link => {
                        const isActive = pathname === link.path
                        return (
                            <Link
                                key={link.element}
                                href={link.path}
                                className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 group
                                    ${isActive ? 'text-black' : 'text-amber-900 hover:text-black'}`}
                            >
                                {link.element}
                                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2.5px] bg-black rounded-full transition-all duration-300
                                    ${isActive ? 'w-5' : 'w-0 group-hover:w-4'}`}
                                />
                            </Link>
                        )
                    })}
                </nav>

                <NavigationMenu className="flex md:hidden">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent hover:bg-white/50 rounded-2xl p-3 transition-all">
                                <Menu className="w-5 h-5" />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[220px] gap-1 p-3">
                                    {links.map(link => (
                                        <li key={link.element}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={link.path}
                                                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === link.path
                                                        ? 'bg-white text-black shadow-sm'
                                                        : 'text-amber-900 hover:bg-white/70'
                                                        }`}
                                                >
                                                    {link.element}
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="shrink-0">
                <Link href="/">
                    <h2 className="font-black text-2xl tracking-widest text-amber-950 hover:text-black transition-colors">
                        VECTOR
                    </h2>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-end gap-1">

                <Link href="/cart" className="relative p-3 hover:bg-white/50 rounded-2xl transition-all text-amber-950 hover:text-black">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-amber-300">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </Link>

                <Link href="/wishlist" className="relative p-3 hover:bg-white/50 rounded-2xl transition-all text-amber-950 hover:text-black">
                    <Heart className="w-5 h-5" />
                    {wishCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-amber-300">
                            {wishCount > 99 ? '99+' : wishCount}
                        </span>
                    )}
                </Link>

                <div className="hidden md:flex items-center border-l border-amber-400/50 pl-4 ml-3">
                    {isLoggedIn && user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="flex items-center gap-2.5 bg-white/60 hover:bg-white/80 transition-all rounded-3xl pl-2 pr-4 py-1 border border-white/40"
                            >
                                <div className="w-8 h-8 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-semibold text-amber-950 max-w-[110px] truncate">
                                    {user.name}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-amber-900 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center text-white">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {[
                                        { href: '/profile', icon: User, label: 'Profile' },
                                        { href: '/orders', icon: Package, label: 'My Orders' },
                                        { href: '/wishlist', icon: Heart, label: 'Wishlist', count: wishCount },
                                        { href: '/addresses', icon: MapPin, label: 'Addresses' },
                                    ].map(({ href, icon: Icon, label, count }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-amber-50 transition-colors"
                                        >
                                            <span className="flex items-center gap-3">
                                                <Icon className="w-4 h-4 text-gray-400" />
                                                {label}
                                            </span>
                                            {count !== undefined && count > 0 && (
                                                <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                                                    {count}
                                                </span>
                                            )}
                                        </Link>
                                    ))}

                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {auth.map((link, i) => (
                                <Link
                                    key={link.element}
                                    href={link.path}
                                    className={`px-6 py-2.5 rounded-3xl text-sm font-semibold transition-all duration-200 ${i === 1
                                        ? 'bg-zinc-900 text-white hover:bg-black hover:shadow-md'
                                        : 'text-amber-950 hover:bg-white/60'
                                        }`}
                                >
                                    {link.element}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default NavigationMenuDemo