'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Authcontext'
import { getCartApi } from '@/app/apis/cart/addCart.api'
import { getAddressesApi, type AddressInterface } from '@/app/apis/addresses.api'
import { cashCheckoutApi, onlineCheckoutApi, type ShippingAddress } from '@/app/apis/checkout.api'
import { showToast } from '@/lib/toast'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft, CreditCard, Banknote, MapPin,
    Plus, CheckCircle2, ShoppingBag, ChevronRight,
    Loader2, Building2, Phone, Map,
} from 'lucide-react'

type PaymentMethod = 'cash' | 'online'
type AddressMode = 'saved' | 'new'

interface CartItem {
    _id: string
    product: { _id: string; title: string; imageCover: string; price: number }
    count: number
    price: number
}

interface CartData {
    _id: string
    products: CartItem[]
    totalCartPrice: number
    totalAfterDiscount?: number
}

const emptyAddress = { details: '', phone: '', city: '' }

export default function CheckoutPage() {
    const { token, isLoggedIn } = useAuth()
    const router = useRouter()

    const [cart, setCart] = useState<CartData | null>(null)
    const [addresses, setAddresses] = useState<AddressInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
    const [addressMode, setAddressMode] = useState<AddressMode>('saved')
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
    const [newAddress, setNewAddress] = useState(emptyAddress)

    useEffect(() => {
        if (!isLoggedIn || !token) { setLoading(false); return }
        Promise.all([getCartApi(token), getAddressesApi(token)])
            .then(([cartData, addrData]) => {
                setCart(cartData.data)
                setAddresses(addrData)
                if (addrData.length > 0) setSelectedAddressId(addrData[0]._id)
                else setAddressMode('new')
            })
            .catch(() => showToast({ title: 'Error', message: 'Could not load checkout data.', type: 'error' }))
            .finally(() => setLoading(false))
    }, [token, isLoggedIn])

    const resolveShippingAddress = (): ShippingAddress | null => {
        if (addressMode === 'saved') {
            const addr = addresses.find(a => a._id === selectedAddressId)
            if (!addr) return null
            return { details: addr.details, phone: addr.phone, city: addr.city }
        }
        if (!newAddress.details || !newAddress.phone || !newAddress.city) return null
        return newAddress
    }

    const handlePlaceOrder = async () => {
        if (!token || !cart) return
        const shipping = resolveShippingAddress()
        if (!shipping) {
            showToast({ title: 'Missing address', message: 'Please fill in all address fields.', type: 'error' })
            return
        }
        setSubmitting(true)
        try {
            if (paymentMethod === 'cash') {
                await cashCheckoutApi(cart._id, token, shipping)
                showToast({ title: 'Order placed!', message: 'Your order has been placed successfully.', type: 'success' })
                router.push('/')
            } else {
                const url = await onlineCheckoutApi(cart._id, token, shipping)
                if (url) window.location.href = url
                else throw new Error('No payment URL returned')
            }
        } catch (err: any) {
            showToast({ title: 'Failed', message: err.message || 'Something went wrong.', type: 'error' })
        } finally {
            setSubmitting(false)
        }
    }

    if (!isLoggedIn) return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-3xl shadow flex items-center justify-center mb-8">
                    <ShoppingBag className="w-10 h-10 text-amber-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Sign in to checkout</h2>
                <p className="text-gray-600 mb-10">You need to be logged in to complete your purchase.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all active:scale-95">
                    Sign in <ChevronRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    )

    if (loading) return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="animate-pulse grid lg:grid-cols-[1fr_400px] gap-10">
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl h-80" />
                    <div className="bg-white rounded-3xl h-96" />
                </div>
                <div className="bg-white rounded-3xl h-[520px]" />
            </div>
        </div>
    )

    if (!cart || cart.products?.length === 0) return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-3xl shadow flex items-center justify-center mb-8">
                    <ShoppingBag className="w-10 h-10 text-amber-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                <p className="text-gray-600 mb-10">Add some products to start checkout.</p>
                <Link href="/" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all active:scale-95">
                    Shop now <ChevronRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    )

    const total = cart.totalAfterDiscount ?? cart.totalCartPrice

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Cart
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-12">Checkout</h1>

                <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

                    <div className="flex flex-col gap-8">

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-9 h-9 bg-amber-500 text-white text-sm font-bold rounded-2xl flex items-center justify-center">1</div>
                                <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {([
                                    { key: 'cash', label: 'Cash on Delivery', icon: Banknote, sub: 'Pay when you receive your order' },
                                    { key: 'online', label: 'Online Payment', icon: CreditCard, sub: 'Pay securely with card' },
                                ] as const).map(({ key, label, icon: Icon, sub }) => (
                                    <button
                                        key={key}
                                        onClick={() => setPaymentMethod(key)}
                                        className={`group relative flex flex-col gap-4 p-6 rounded-3xl border-2 transition-all text-left overflow-hidden ${paymentMethod === key
                                            ? 'border-amber-500 bg-amber-50 shadow-sm'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${paymentMethod === key ? 'bg-amber-500' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                            <Icon className={`w-6 h-6 ${paymentMethod === key ? 'text-white' : 'text-gray-500'}`} />
                                        </div>
                                        <div>
                                            <p className={`font-semibold text-lg ${paymentMethod === key ? 'text-gray-900' : 'text-gray-700'}`}>{label}</p>
                                            <p className="text-sm text-gray-500 mt-1">{sub}</p>
                                        </div>
                                        {paymentMethod === key && (
                                            <CheckCircle2 className="absolute top-6 right-6 w-6 h-6 text-amber-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-9 h-9 bg-amber-500 text-white text-sm font-bold rounded-2xl flex items-center justify-center">2</div>
                                <h2 className="text-2xl font-semibold text-gray-900">Delivery Address</h2>
                            </div>

                            {addresses.length > 0 && (
                                <div className="flex gap-3 mb-8">
                                    {(['saved', 'new'] as const).map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setAddressMode(mode)}
                                            className={`flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all border-2 ${addressMode === mode
                                                ? 'border-amber-500 bg-amber-50 text-gray-900 shadow-sm'
                                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                                }`}
                                        >
                                            {mode === 'saved' ? 'Use Saved Address' : 'Add New Address'}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {addressMode === 'saved' && addresses.length > 0 ? (
                                <div className="space-y-4">
                                    {addresses.map(addr => (
                                        <button
                                            key={addr._id}
                                            onClick={() => setSelectedAddressId(addr._id)}
                                            className={`w-full flex items-start gap-5 p-6 rounded-3xl border-2 text-left transition-all ${selectedAddressId === addr._id
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-1 ${selectedAddressId === addr._id ? 'bg-amber-500' : 'bg-gray-100'}`}>
                                                <MapPin className={`w-5 h-5 ${selectedAddressId === addr._id ? 'text-white' : 'text-gray-500'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="font-semibold text-gray-900">{addr.alias}</p>
                                                </div>
                                                <p className="text-gray-600 mt-2 leading-relaxed">{addr.details}</p>
                                                <p className="text-gray-600">{addr.city}</p>
                                                <p className="text-gray-500 mt-1">{addr.phone}</p>
                                            </div>
                                            {selectedAddressId === addr._id && (
                                                <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-2" />
                                            )}
                                        </button>
                                    ))}

                                    <Link
                                        href="/addresses"
                                        className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-medium py-4 border border-dashed border-gray-300 rounded-3xl hover:border-amber-300 transition-colors mt-2"
                                    >
                                        <Plus className="w-5 h-5" /> Add another saved address
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {[
                                        { name: 'details', label: 'Street Address', placeholder: '123 Example Street, Apartment 12', icon: Building2 },
                                        { name: 'phone', label: 'Phone Number', placeholder: '+20 123 456 7890', icon: Phone },
                                        { name: 'city', label: 'City', placeholder: 'Cairo, Alexandria, Giza...', icon: Map },
                                    ].map(({ name, label, placeholder, icon: Icon }) => (
                                        <div key={name} className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{label}</label>
                                            <div className="relative">
                                                <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    name={name}
                                                    value={newAddress[name as keyof typeof newAddress]}
                                                    onChange={e => setNewAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                                    placeholder={placeholder}
                                                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-base"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 lg:sticky lg:top-8 self-start">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-9 h-9 bg-amber-500 text-white text-sm font-bold rounded-2xl flex items-center justify-center">3</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Order Summary</h2>
                        </div>

                        <div className="space-y-5 mb-8 max-h-80 overflow-y-auto pr-2">
                            {cart.products.map(item => (
                                <div key={item._id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            width={80}
                                            height={80}
                                            className="object-contain w-full h-full p-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 line-clamp-2 leading-tight">{item.product.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">Qty: {item.count}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-semibold text-gray-900">{(item.price * item.count).toLocaleString()} EGP</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-6 space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{cart.totalCartPrice.toLocaleString()} EGP</span>
                            </div>
                            {cart.totalAfterDiscount && (
                                <div className="flex justify-between text-emerald-600">
                                    <span>Discount Applied</span>
                                    <span>-{(cart.totalCartPrice - cart.totalAfterDiscount).toLocaleString()} EGP</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-medium">Free</span>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-gray-100 text-lg font-bold">
                                <span className="text-gray-900">Total</span>
                                <span className="text-amber-600">{total.toLocaleString()} EGP</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={submitting}
                            className="mt-10 w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-semibold py-5 rounded-3xl transition-all flex items-center justify-center gap-3 text-lg active:scale-[0.985] shadow-lg shadow-amber-500/30"
                        >
                            {submitting ? (
                                <><Loader2 className="w-6 h-6 animate-spin" /> Processing Order...</>
                            ) : paymentMethod === 'cash' ? (
                                <><Banknote className="w-6 h-6" /> Place Cash Order</>
                            ) : (
                                <><CreditCard className="w-6 h-6" /> Pay Securely Now</>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-5 leading-relaxed">
                            {paymentMethod === 'online'
                                ? 'You will be redirected to a secure payment gateway.'
                                : 'Pay cash when your order is delivered. No upfront payment needed.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}