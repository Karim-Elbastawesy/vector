import { ArrowRight, PackageX, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="relative mx-auto w-40 h-40 mb-10">
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl"></div>
                    <div className="relative rounded-full bg-white shadow-xl border-4 border-amber-500 w-40 h-40 flex items-center justify-center p-6">
                        <PackageX className="w-20 h-20 text-amber-600" />
                    </div>
                    
                    <div className="absolute -top-3 -right-3 bg-white rounded-2xl shadow-md p-3 rotate-12">
                        <ShoppingBag className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-md p-3 -rotate-12">
                        <ShoppingBag className="w-6 h-6 text-amber-500" />
                    </div>
                </div>

                <div className="text-center space-y-6">
                    <div className="space-y-3">
                        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
                            No orders yet
                        </h2>
                        <p className="text-lg text-gray-600 max-w-sm mx-auto">
                            Looks like your order history is empty. 
                            Time to discover some amazing products!
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent my-8"></div>

                    <Link href="/">
                        <button className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xl font-medium px-10 py-5 rounded-3xl shadow-lg shadow-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.985]">
                            <span>Start Shopping Now</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}