"use client"

import { Mail, MapPin, Phone, Send, TextSelect, User } from 'lucide-react'
import React, { useState } from 'react'
import { showToast } from '@/lib/toast'

export default function Page() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.name.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
            showToast({
                title: "Missing fields",
                message: "Please fill in all fields before sending.",
                type: "error",
            })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            showToast({
                title: "Invalid email",
                message: "Please enter a valid email address.",
                type: "error",
            })
            return
        }

        setLoading(true)
        try {
            await new Promise(res => setTimeout(res, 800))
            showToast({
                title: "Message sent!",
                message: "Thanks for reaching out. We'll get back to you soon.",
                type: "success",
            })
            setForm({ name: '', email: '', subject: '', message: '' })
        } catch {
            showToast({
                title: "Failed to send",
                message: "Something went wrong. Please try again.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#FFB300_100%)]" />
            <section className="w-full max-w-5xl mx-auto py-6">
                <div className="flex flex-col gap-3 items-center justify-center mb-12 text-center">
                    <h3 className="text-amber-600 font-semibold tracking-wider uppercase text-sm">Contact Us</h3>
                    <p className="text-4xl md:text-5xl font-bold text-gray-900">Get in touch</p>
                </div>

                <div className="flex flex-col md:flex-row gap-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden p-2">
                    <div className="w-full md:w-2/5 bg-zinc-900 text-white p-8 md:p-10 rounded-[1.5rem] flex flex-col gap-10">
                        <div>
                            <h4 className="text-2xl font-semibold mb-2">Chat with us</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">We'd love to hear from you. Our friendly team is always here to help.</p>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4 group">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-zinc-400 text-sm">info@vector.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-zinc-400 text-sm">+20 123 456 7890</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Office</p>
                                    <p className="text-zinc-400 text-sm">Cairo, Egypt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                            <div className="relative w-full">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl outline-none focus:border-amber-600 transition-colors"
                                />
                            </div>

                            <div className="relative w-full">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl outline-none focus:border-amber-600 transition-colors"
                                />
                            </div>

                            <div className="relative w-full">
                                <TextSelect className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl outline-none focus:border-amber-600 transition-colors"
                                >
                                    <option hidden value="">Select your subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="order">Order Support</option>
                                    <option value="shipping">Shipping Question</option>
                                    <option value="returns">Returns &amp; Refunds</option>
                                    <option value="product">Product Information</option>
                                    <option value="feedback">Feedback &amp; Suggestions</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="relative w-full">
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full pl-3 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl outline-none focus:border-amber-600 transition-colors"
                                    rows={5}
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-full gap-2 rounded-xl flex p-3 text-2xl bg-amber-400 items-center justify-center hover:bg-amber-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                                {loading ? "Sending..." : "Send message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}