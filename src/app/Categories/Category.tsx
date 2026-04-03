import React from 'react'
import { CategoryInterface, getCategories } from '../apis/categories.api'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {

  const data = await getCategories()
  return (
    <>
      <h2 className='border-l-10 border-amber-500 rounded-md my-6 p-2 text-3xl'>Shop by <span className='text-amber-500'>Category</span></h2>
      <div className='gap-4 my-6 grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2'>
        {data.map(cat => <CatItem key={cat._id} cat={cat}></CatItem>)}
      </div>
    </>
  )
}

function CatItem({ cat }: { cat: CategoryInterface }) {
  return (
    <>
      <Link
        href={`categories/${cat._id}`}
        className="relative group block aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute p-8 flex items-center justify-center">
          <img
            src={cat.image}
            className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-out"
            alt={cat.name}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <p className="text-white text-center font-bold text-lg drop-shadow-md">
            {cat.name}
          </p>
        </div>
      </Link>
    </>
  )
}
