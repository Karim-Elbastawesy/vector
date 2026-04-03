import { Truck, Lock, Headset, ShieldCheck } from 'lucide-react'
import React from 'react'

export default function InfoCards() {
    const features = [
        {
            icon: Headset,
            title: "24/7 Expert Support",
            subtitle: "Always here to help you, day or night."
        },
        {
            icon: ShieldCheck,
            title: "14-Day Easy Returns",
            subtitle: "Shop with complete peace of mind."
        },
        {
            icon: Lock,
            title: "Secure Payments",
            subtitle: "100% safe & encrypted checkout."
        },
        {
            icon: Truck,
            title: "Fast & Free Delivery",
            subtitle: "Free shipping on all orders over 1500 EGP."
        }
    ]

    return (
        <section className="py-8 w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                {features.map((feature, index) => {
                    const Icon = feature.icon; 

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-5 p-5 bg-white border border-zinc-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group"
                        >
                            <div className="p-3 bg-amber-50 text-amber-500 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0">
                                <Icon size={28} />
                            </div>

                            <div className="flex flex-col">
                                <h4 className="font-semibold text-zinc-900 text-base mb-1">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-zinc-500">
                                    {feature.subtitle}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}