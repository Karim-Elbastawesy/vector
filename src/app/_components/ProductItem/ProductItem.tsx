'use client'

import { productsInterface } from '@/interfaces/product.interface'
import Link from 'next/link'
import { Eye, Heart, Plus, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '../../../context/Authcontext'
import { addToCartApi } from '@/app/apis/cart/addCart.api'
import { addToWishlistApi } from '../../apis/wishlist/wishlist.api'
import { showToast } from '@/lib/toast'

interface pageProps {
    prod: productsInterface
}

export default function ProductItem({ prod }: pageProps) {
    const { token, isLoggedIn } = useAuth()
    const [cartLoading, setCartLoading] = useState(false)
    const [wishLoading, setWishLoading] = useState(false)
    const [wished, setWished] = useState(false)

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!isLoggedIn || !token) {
            showToast({ title: "Sign in required", message: "Please log in to add items to your cart.", type: "error" })
            return
        }
        setCartLoading(true)
        try {
            await addToCartApi(prod._id, token)
            showToast({ title: "Added to cart", message: `${prod.title} added to your cart.`, type: "success" })
        } catch {
            showToast({ title: "Failed", message: "Could not add to cart. Try again.", type: "error" })
        } finally {
            setCartLoading(false)
        }
    }

    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!isLoggedIn || !token) {
            showToast({ title: "Sign in required", message: "Please log in to save items.", type: "error" })
            return
        }
        setWishLoading(true)
        try {
            await addToWishlistApi(prod._id, token)
            setWished(true)
            showToast({ title: "Saved", message: `${prod.title} added to your wishlist.`, type: "success" })
        } catch {
            showToast({ title: "Failed", message: "Could not update wishlist. Try again.", type: "error" })
        } finally {
            setWishLoading(false)
        }
    }

    return (
        <div className='p-4 rounded-3xl h-full hover:-translate-y-2 hover:shadow-2xl hover:border-amber-500 transition-all border border-gray-200 relative group'>

            {prod.priceAfterDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full shadow-md z-10">
                    <p className='text-white text-xs font-bold tracking-wider'>SALE</p>
                </div>
            )}

            <div className="relative">
                <Link href={`/productDetails/${prod._id}`}>
                    <Image
                        width={250}
                        height={200}
                        src={prod.imageCover}
                        alt={prod.title}
                        className='block object-contain h-auto mx-auto'
                    />
                </Link>

                <div className="absolute top-1/2 -translate-y-1/2 -right-1 flex flex-col gap-2 opacity-0 group-hover:opacity-100 group-hover:right-1 transition-all duration-300">
                    <Link
                        href={`/productDetails/${prod._id}`}
                        className="bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-amber-400 hover:border-amber-400 hover:text-white transition-colors"
                        title="View product"
                    >
                        <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <button
                        onClick={handleWishlist}
                        disabled={wishLoading || wished}
                        title="Add to wishlist"
                        className={`bg-white border rounded-full p-2 shadow-md transition-colors disabled:opacity-60
                            ${wished
                                ? 'border-red-200 text-red-500'
                                : 'border-gray-200 hover:bg-red-500 hover:border-red-500 hover:text-white'
                            }`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    <button
                        onClick={handleAddToCart}
                        disabled={cartLoading}
                        title="Add to cart"
                        className="bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors disabled:opacity-60"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <h5 className='font-light text-gray-500 my-2'>{prod.category.name}</h5>
            <p className='line-clamp-2'>{prod.title}</p>

            <p className='flex gap-2 items-center'>
                {prod.ratingsAverage} <StarIcon className='w-4 h-4 text-yellow-400 fill-yellow-400' />
            </p>

            <div className="flex justify-between items-center mt-4">
                {prod.priceAfterDiscount ? (
                    <div className='flex flex-col'>
                        <p className='text-xl font-semibold'>{prod.priceAfterDiscount} EGP</p>
                        <p className='text-gray-400 text-sm line-through'>{prod.price} EGP</p>
                    </div>
                ) : (
                    <p className='text-xl font-semibold'>{prod.price} EGP</p>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className='rounded-full bg-amber-500 hover:bg-amber-600 h-10 w-10 p-0 flex items-center justify-center transition-colors disabled:opacity-60'
                >
                    <Plus className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    )
}