import Link from 'next/link'
import { Mail, MapPin, Phone, ShoppingBag } from 'lucide-react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si'

const shop = [
    { label: 'All Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Brands', href: '/brands' },
    { label: 'Electronics', href: '/categories' },
    { label: "Men's Fashion", href: '/categories' },
    { label: "Women's Fashion", href: '/categories' },
]

const account = [
    { label: 'My Account', href: '/profile' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/register' },
]

const support = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Info', href: '/contact' },
    { label: 'Returns & Refunds', href: '/contact' },
]

const legal = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
]

const socials = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
]



export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white">


            <div className="max-w-10xl mx-auto px-6 md:px-20 py-14 grid grid-cols-1 md:grid-cols-6 gap-10">

                <div className="md:col-span-2 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="bg-amber-400 rounded-xl p-2">
                            <ShoppingBag className="w-5 h-5 text-gray-900" />
                        </div>
                        <span className="text-xl font-black tracking-widest text-white">VECTOR</span>
                    </Link>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
                    </p>

                    <div className="flex flex-col gap-3 text-sm">
                        <a href="tel:+201234567890" className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors">
                            <Phone className="w-4 h-4 shrink-0" />
                            +20 123 456 7890
                        </a>
                        <a href="mailto:support@vector.com" className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors">
                            <Mail className="w-4 h-4 shrink-0" />
                            support@vector.com
                        </a>
                        <span className="flex items-center gap-3 text-zinc-400">
                            <MapPin className="w-4 h-4 shrink-0" />
                            Cairo, Egypt
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-amber-400 hover:text-amber-400 transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <p className="font-bold text-sm mb-4 text-white">Shop</p>
                        <ul className="flex flex-col gap-2.5">
                            {shop.map(l => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-sm mb-4 text-white">Account</p>
                        <ul className="flex flex-col gap-2.5">
                            {account.map(l => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-sm mb-4 text-white">Support</p>
                        <ul className="flex flex-col gap-2.5">
                            {support.map(l => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-sm mb-4 text-white">Legal</p>
                        <ul className="flex flex-col gap-2.5">
                            {legal.map(l => (
                                <li key={l.label}>
                                    <Link href={l.href} className="text-zinc-400 hover:text-amber-400 text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <p className="font-bold text-sm mb-4 text-white">Newsletter</p>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400 transition-colors w-full"
                                />
                                <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm py-2 rounded-lg transition-colors w-full">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-800">
                <div className="max-w-10xl mx-auto px-6 md:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-500 text-sm">© 2026 Vector. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-zinc-500">
                        <SiVisa className="w-8 h-5" />
                        <SiMastercard className="w-8 h-5" />
                        <SiPaypal className="w-8 h-5" />
                    </div>
                </div>
            </div>
        </footer>
    )
}