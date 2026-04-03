'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Authcontext'
import { getWishlistApi, removeFromWishlistApi } from '../apis/wishlist/wishlist.api'
import { addToCartApi } from '@/app/apis/cart/addCart.api'
import { showToast } from '@/lib/toast'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'

interface WishlistProduct {
    _id: string
    title: string
    imageCover: string
    price: number
    priceAfterDiscount?: number
    ratingsAverage: number
    category: { name: string }
    brand: { name: string }
}

export default function Wishlist() {
    const { token, isLoggedIn } = useAuth()
    const [items, setItems] = useState<WishlistProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [cartLoadingId, setCartLoadingId] = useState<string | null>(null)

    const fetchWishlist = async () => {
        if (!token) return
        try {
            const data = await getWishlistApi(token)
            setItems(data.data ?? [])
        } catch {
            showToast({ title: "Error", message: "Could not load wishlist.", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoggedIn && token) fetchWishlist()
        else setLoading(false)
    }, [token, isLoggedIn])

    const handleRemove = async (productId: string) => {
        if (!token) return
        setRemovingId(productId)
        try {
            await removeFromWishlistApi(productId, token)
            setItems(prev => prev.filter(p => p._id !== productId))
            showToast({ title: "Removed", message: "Item removed from your wishlist.", type: "info" })
        } catch {
            showToast({ title: "Error", message: "Could not remove item.", type: "error" })
        } finally {
            setRemovingId(null)
        }
    }

    const handleAddToCart = async (product: WishlistProduct) => {
        if (!token) return
        setCartLoadingId(product._id)
        try {
            await addToCartApi(product._id, token)
            showToast({ title: "Added to cart", message: `${product.title} added to your cart.`, type: "success" })
        } catch {
            showToast({ title: "Error", message: "Could not add to cart.", type: "error" })
        } finally {
            setCartLoadingId(null)
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to view your wishlist</h2>
                <p className="text-gray-500 mb-6">You need to be logged in to access your saved items.</p>
                <Link href="/login" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors">
                    Sign in <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-2xl h-24" />
                    ))}
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-6">Save items you love and come back to them later.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors">
                    Start browsing <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-8">
                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                <h1 className="text-2xl font-bold">
                    My <span className="text-amber-500">Wishlist</span>
                </h1>
                <span className="text-gray-400 text-base font-normal">({items.length} items)</span>
            </div>

            <div className="flex flex-col gap-3">
                {items.map(product => (
                    <div
                        key={product._id}
                        className={`flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-amber-200 hover:shadow-md transition-all duration-200 ${removingId === product._id ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <Link href={`/productDetails/${product._id}`} className="shrink-0">
                            <div className="w-35 h-35 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                                <Image
                                    src={product.imageCover}
                                    alt={product.title}
                                    width={80}
                                    height={80}
                                    className="object-contain w-full h-full p-1"
                                />
                            </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 mb-0.5">{product.category.name}</p>
                            <Link href={`/productDetails/${product._id}`}>
                                <p className="font-medium text-sm line-clamp-2 hover:text-amber-600 transition-colors">
                                    {product.title}
                                </p>
                            </Link>
                            <div className="flex items-center gap-2 mt-1.5">
                                {product.priceAfterDiscount ? (
                                    <>
                                        <span className="font-bold text-amber-500">{product.priceAfterDiscount} EGP</span>
                                        <span className="text-gray-400 text-xs line-through">{product.price} EGP</span>
                                        <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">SALE</span>
                                    </>
                                ) : (
                                    <span className="font-bold text-gray-800">{product.price} EGP</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={cartLoadingId === product._id}
                                title="Add to cart"
                                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-3 py-2 rounded-xl transition-colors disabled:opacity-60"
                            >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                {cartLoadingId === product._id ? '...' : 'Add to cart'}
                            </button>

                            <button
                                onClick={() => handleRemove(product._id)}
                                disabled={removingId === product._id}
                                title="Remove from wishlist"
                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}