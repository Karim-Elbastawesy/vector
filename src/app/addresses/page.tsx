'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Authcontext'
import {
    getAddressesApi,
    addAddressApi,
    deleteAddressApi,
    type AddressInterface,
} from '@/app/apis/addresses.api'
import { showToast } from '@/lib/toast'
import Link from 'next/link'
import {
    Map, MapPinHouse, Plus, Trash2, X,
    ArrowRight, MapPin, Phone, Building2,
    Hash, Tag, CheckCircle2,
} from 'lucide-react'

const emptyForm = { alias: '', details: '', phone: '', city: '', postalCode: '' }

export default function AddressPage() {
    const { token, isLoggedIn } = useAuth()
    const [addresses, setAddresses] = useState<AddressInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        if (isLoggedIn && token) fetchAddresses()
        else setLoading(false)
    }, [token, isLoggedIn])

    const fetchAddresses = async () => {
        try {
            const data = await getAddressesApi(token!)
            setAddresses(data)
        } catch {
            showToast({ title: 'Error', message: 'Could not load addresses.', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) return
        if (!form.alias || !form.details || !form.phone || !form.city || !form.postalCode) {
            showToast({ title: 'Missing fields', message: 'Please fill in all fields.', type: 'error' })
            return
        }
        setSubmitting(true)
        try {
            const updated = await addAddressApi(token, form)
            setAddresses(updated)
            setForm(emptyForm)
            setModalOpen(false)
            showToast({ title: 'Address added', message: 'Your address has been saved.', type: 'success' })
        } catch {
            showToast({ title: 'Error', message: 'Could not save address.', type: 'error' })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!token) return
        setDeletingId(id)
        try {
            const updated = await deleteAddressApi(token, id)
            setAddresses(updated)
            showToast({ title: 'Removed', message: 'Address deleted successfully.', type: 'info' })
        } catch {
            showToast({ title: 'Error', message: 'Could not delete address.', type: 'error' })
        } finally {
            setDeletingId(null)
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto w-20 h-20 bg-white rounded-3xl shadow flex items-center justify-center mb-8">
                        <MapPin className="w-10 h-10 text-amber-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Sign in to manage addresses</h2>
                    <p className="text-gray-600 mb-10">You need to be logged in to view and manage your saved addresses.</p>
                    <Link href="/login" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all active:scale-95">
                        Sign in <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                            My Addresses
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            {addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}
                        </p>
                    </div>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-4 rounded-2xl transition-all active:scale-[0.97] shadow-lg shadow-amber-500/20 text-lg"
                    >
                        <Plus className="w-6 h-6" />
                        Add New Address
                    </button>
                </div>

                {addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative mx-auto w-44 h-44 mb-10">
                            <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl" />
                            <div className="relative rounded-full bg-white shadow-2xl border-[6px] border-amber-400 w-44 h-44 flex items-center justify-center">
                                <Map className="w-20 h-20 text-amber-500" strokeWidth={1.4} />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white rounded-3xl shadow-xl p-4 rotate-12">
                                <MapPinHouse className="w-8 h-8 text-amber-500" />
                            </div>
                            <div className="absolute -bottom-5 -left-5 bg-white rounded-3xl shadow-xl p-4 -rotate-12">
                                <MapPinHouse className="w-8 h-8 text-amber-500" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">No addresses saved yet</h2>
                        <p className="text-gray-600 max-w-xs mx-auto text-lg leading-relaxed">
                            Add your delivery addresses to make checkout faster and smoother.
                        </p>

                        <button
                            onClick={() => setModalOpen(true)}
                            className="mt-10 flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-5 rounded-2xl transition-all active:scale-95 text-xl shadow-xl shadow-amber-500/30"
                        >
                            <Plus className="w-6 h-6" />
                            Add Your First Address
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {addresses.map((addr, index) => (
                            <div
                                key={addr._id}
                                className={`bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group ${deletingId === addr._id ? 'opacity-60 pointer-events-none' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-6">
                                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <MapPin className="w-7 h-7 text-amber-500" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-semibold text-gray-900">{addr.alias}</span>
                                                {index === 0 && (
                                                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Default
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-2.5 text-gray-600">
                                                <div className="flex items-start gap-3">
                                                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                                    <span className="leading-snug">{addr.details}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Map className="w-5 h-5 text-gray-400 shrink-0" />
                                                    <span>{addr.city}{addr.postalCode && `, ${addr.postalCode}`}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                                                    <span>{addr.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(addr._id)}
                                        className="text-gray-300 hover:text-red-500 p-3 rounded-2xl hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                        disabled={deletingId === addr._id}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="px-8 py-6 border-b flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
                                <p className="text-gray-500 text-sm mt-1">Enter your delivery information</p>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-7">
                            {[
                                { name: 'alias', label: 'Address Label', placeholder: 'Home, Office, Parents...', icon: Tag },
                                { name: 'details', label: 'Street Address', placeholder: '123 Example Street, Building 5, Apt 12', icon: Building2 },
                                { name: 'phone', label: 'Phone Number', placeholder: '+20 123 456 7890', icon: Phone },
                                { name: 'city', label: 'City', placeholder: 'Cairo, Alexandria...', icon: Map },
                                { name: 'postalCode', label: 'Postal Code', placeholder: '12345', icon: Hash },
                            ].map(({ name, label, placeholder, icon: Icon }) => (
                                <div key={name} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 block">{label}</label>
                                    <div className="relative">
                                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            name={name}
                                            value={form[name as keyof typeof form]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-base"
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-4 w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.985]"
                            >
                                <Plus className="w-6 h-6" />
                                {submitting ? 'Saving Address...' : 'Save Address'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}