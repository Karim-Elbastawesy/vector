import { getSingleBrand, getProductsByBrand } from '@/app/apis/brands.api'
import ProductItem from '@/app/_components/ProductItem/ProductItem'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const brand = await getSingleBrand(id)
    const products = await getProductsByBrand(id)

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link
                href="/brands"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Brands
            </Link>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                    <Image
                        src={brand.image}
                        alt={brand.name}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full p-3"
                    />
                </div>
                <div >
                    <p className="text-xs text-amber-500 font-semibold uppercase tracking-widest mb-1">Brand</p>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{brand.name}</h1>
                    <p className="text-gray-400 text-sm">{products.length} products available</p>
                </div>
            </div>

            {products.length > 0 ? (
                <>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-amber-500 rounded-full" />
                        <h2 className="text-xl font-bold">
                            Products by <span className="text-amber-500">{brand.name}</span>
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
                    <p className="text-gray-400 font-medium">No products found for this brand.</p>
                </div>
            )}
        </div>
    )
}