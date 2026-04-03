import React from 'react'
import { BrandsInterface, getBrands } from '../apis/brands.api'
import Link from 'next/link'

export default async function Brands() {
  const data = await getBrands()

  return (
    <section className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 bg-amber-500 rounded-full"></div>
        <h2 className='text-3xl font-bold'>Shop by <span className='text-amber-500'>Brands</span></h2>
      </div>

      <div className='gap-6 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
        {data.map(brand => <BrandItem key={brand._id} brand={brand} />)}
      </div>
    </section>
  )
}

function BrandItem({ brand }: { brand: BrandsInterface }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="relative group block aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute p-8 flex items-center justify-center">
        <img
          src={brand.image}
          className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-out"
          alt={brand.name}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
        <p className="text-white text-center font-bold text-lg drop-shadow-md">
          {brand.name}
        </p>
      </div>
    </Link>
  )
}