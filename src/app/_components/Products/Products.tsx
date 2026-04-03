import { getProducts } from '@/app/apis/products.api'
import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

export default async function Products() {
    const data = await getProducts()
    return (
        <>
            <h2 className='border-l-10 border-amber-500 rounded-md my-6 p-2 text-3xl'>Shop by <span className='text-amber-500'>Products</span></h2>

            <div className=' grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5 py-8'>
            {data?.map(prod => <ProductItem prod={prod} key={prod._id}>

            </ProductItem>)}
        </div>
        </>
    )
}
