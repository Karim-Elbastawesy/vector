'use client'

import React, { useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useAuth } from '../../../context/Authcontext'
import { addToCartApi } from '@/app/apis/cart/addCart.api'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'

interface AddToCartProps {
    productId: string
    productTitle?: string
}

export default function AddToCart({ productId, productTitle }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)
    const { token, isLoggedIn } = useAuth()
    const router = useRouter()

    const increment = () => setQuantity(prev => prev + 1)
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

    const handleAddToCart = async () => {
        if (!isLoggedIn || !token) {
            showToast({ title: "Sign in required", message: "Please log in to add items to your cart.", type: "error" })
            router.push('/login')
            return
        }
        setLoading(true)
        try {
            await addToCartApi(productId, token)
            showToast({
                title: "Added to cart",
                message: `${productTitle ?? 'Item'} (x${quantity}) added to your cart.`,
                type: "success",
            })
        } catch {
            showToast({ title: "Failed", message: "Could not add to cart. Please try again.", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col xl:flex-row gap-4 w-full">
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-full xl:w-auto">
                <button
                    onClick={decrement}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 xl:w-12 h-12 flex items-center justify-center font-bold text-lg border-x-2 border-gray-200">
                    {quantity}
                </div>
                <button
                    onClick={increment}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 h-12 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
                <ShoppingCart className="w-5 h-5" />
                {loading ? "Adding..." : "Add to cart"}
            </button>
        </div>
    )
}