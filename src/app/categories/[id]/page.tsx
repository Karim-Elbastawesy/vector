import { getSingleCategory, getProductsByCategory } from '@/app/apis/categories.api'
import ProductItem from '@/app/_components/ProductItem/ProductItem'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const category = await getSingleCategory(id)
    const products = await getProductsByCategory(id)

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Categories
            </Link>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                    <Image
                        src={category.image}
                        alt={category.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <p className="text-xs text-amber-500 font-semibold uppercase tracking-widest mb-1">Category</p>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{category.name}</h1>
                    <p className="text-gray-400 text-sm">{products.length} products available</p>
                </div>
            </div>

            {products.length > 0 ? (
                <>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-amber-500 rounded-full" />
                        <h2 className="text-xl font-bold">
                            Products in <span className="text-amber-500">{category.name}</span>
                        </h2>
                    </div>
                    <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5">
                        {products.map(prod => (
                            <ProductItem prod={prod} key={prod._id} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">No products found in this category.</p>
                </div>
            )}
        </div>
    )
}