import { getSingleProducts, getRelatedProducts } from '@/app/apis/singleprodduct.api'
import React from 'react'
import { StarIcon } from 'lucide-react'
import AddToCart from '../../_components/AddToCart/AddToCart'
import ProductItem from '../../_components/ProductItem/ProductItem'
import ImageGallery from '../../_components/ImageGallery/ImageGallery'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await getSingleProducts(id)
    const related = await getRelatedProducts(data.category._id, data._id)

    const allImages = [data.imageCover, ...(data.images ?? [])]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <ImageGallery images={allImages} title={data.title} />
                </div>

                <div className="w-full md:w-1/2">
                    <div className="sticky top-24">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                                {data.category.name}
                            </span>
                            {data.brand && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    {data.brand.name}
                                </span>
                            )}
                        </div>

                        <h1 className="font-bold text-2xl md:text-3xl mb-4">{data.title}</h1>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                                <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="font-semibold text-sm">{data.ratingsAverage}</span>
                            </div>
                            <span className="text-sm text-gray-400">({data.ratingsQuantity} reviews)</span>
                        </div>

                        <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                            {data.priceAfterDiscount ? (
                                <>
                                    <p className="text-3xl font-bold">
                                        {data.priceAfterDiscount}
                                        <span className="text-base font-normal ml-1 text-gray-500">EGP</span>
                                    </p>
                                    <p className="text-lg text-gray-400 line-through mb-0.5">{data.price} EGP</p>
                                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-0.5">
                                        SALE
                                    </span>
                                </>
                            ) : (
                                <p className="text-3xl font-bold">
                                    {data.price}
                                    <span className="text-base font-normal ml-1 text-gray-500">EGP</span>
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Description</p>
                            <p className="text-gray-600 leading-relaxed">{data.description}</p>
                        </div>

                        <div className="flex items-center gap-3 mb-6 text-sm">
                            <span className={`flex items-center gap-1.5 font-medium ${data.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${data.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                {data.quantity > 0 ? `In Stock (${data.quantity} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        <AddToCart productId={data._id} productTitle={data.title} />
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <div className="mt-20">
                    <h2 className="border-l-4 border-amber-500 pl-4 text-2xl font-bold mb-8">
                        You Might Also <span className="text-amber-500">Like</span>
                    </h2>
                    <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5">
                        {related.slice(0, 10).map(prod => (
                            <ProductItem prod={prod} key={prod._id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}