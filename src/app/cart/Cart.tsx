'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Authcontext'
import { getCartApi } from '@/app/apis/cart/addCart.api'
import { deleteCartItemApi } from '@/app/apis/cart/deleteCart.api'
import { updateCartItemApi } from '@/app/apis/cart/updateCart.api'
import { clearCartApi } from '@/app/apis/cart/clearCart.api'
import { showToast } from '@/lib/toast'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X } from 'lucide-react'

interface CartProduct {
  _id: string
  title: string
  imageCover: string
  price: number
  priceAfterDiscount?: number
}

interface CartItem {
  _id: string
  product: CartProduct
  count: number
  price: number
}

interface CartData {
  _id: string
  products: CartItem[]
  totalCartPrice: number
  totalAfterDiscount?: number
}

export default function Cart() {
  const { token, isLoggedIn } = useAuth()
  const [cart, setCart] = useState<CartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [clearing, setClearing] = useState(false)

  const fetchCart = async () => {
    if (!token) return
    try {
      const data = await getCartApi(token)
      setCart(data.data)
    } catch {
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn && token) fetchCart()
    else setLoading(false)
  }, [token, isLoggedIn])

  const handleUpdate = async (productId: string, count: number) => {
    if (!token || count < 1) return
    setUpdatingId(productId)
    try {
      const data = await updateCartItemApi(productId, count, token)
      setCart(data.data)
    } catch {
      showToast({ title: "Error", message: "Could not update quantity.", type: "error" })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (productId: string) => {
    if (!token) return
    setUpdatingId(productId)
    try {
      const data = await deleteCartItemApi(productId, token)
      setCart(data.data)
      showToast({ title: "Removed", message: "Item removed from cart.", type: "success" })
    } catch {
      showToast({ title: "Error", message: "Could not remove item.", type: "error" })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleClear = async () => {
    if (!token) return
    setClearing(true)
    try {
      await clearCartApi(token)
      setCart(null)
      showToast({ title: "Cart cleared", message: "All items have been removed.", type: "info" })
    } catch {
      showToast({ title: "Error", message: "Could not clear cart.", type: "error" })
    } finally {
      setClearing(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to view your cart</h2>
        <p className="text-gray-500 mb-6">You need to be logged in to access your cart.</p>
        <Link href="/login" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors">
          Sign in <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-28" />
          ))}
        </div>
      </div>
    )
  }

  if (!cart || cart.products?.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors">
          Start shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const total = cart.totalAfterDiscount ?? cart.totalCartPrice

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Shopping <span className="text-amber-500">Cart</span>
          <span className="text-gray-400 text-base font-normal ml-2">({cart.products.length} items)</span>
        </h1>
        <button
          onClick={handleClear}
          disabled={clearing}
          className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {clearing ? 'Clearing...' : 'Clear all'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-3">
          {cart.products.map(item => (
            <div
              key={item._id}
              className={`flex gap-4 items-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm transition-opacity ${updatingId === item.product._id ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <Link href={`/productDetails/${item.product._id}`} className="shrink-0">
                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full p-1"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/productDetails/${item.product._id}`}>
                  <p className="font-medium text-sm line-clamp-2 hover:text-amber-600 transition-colors">{item.product.title}</p>
                </Link>
                <p className="text-amber-500 font-bold mt-1">{item.price} EGP</p>
              </div>

              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => handleUpdate(item.product._id, item.count - 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                  {item.count}
                </span>
                <button
                  onClick={() => handleUpdate(item.product._id, item.count + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <p className="text-sm font-bold w-24 text-right shrink-0">
                {(item.price * item.count).toLocaleString()} EGP
              </p>

              <button
                onClick={() => handleDelete(item.product._id)}
                className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-80 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.products.length} items)</span>
                <span>{cart.totalCartPrice.toLocaleString()} EGP</span>
              </div>
              {cart.totalAfterDiscount && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-{(cart.totalCartPrice - cart.totalAfterDiscount).toLocaleString()} EGP</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-amber-500">{total.toLocaleString()} EGP</span>
              </div>
            </div>

            <Link href='/payment'>
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/" className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors mt-4">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}