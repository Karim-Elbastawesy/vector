import { productsInterface, Root } from "@/interfaces/product.interface"

export interface BrandsInterface {
    _id: string
    name: string
    slug: string
    image: string
}

export interface BrandsRoot {
    results: number
    data: BrandsInterface[]
}

export async function getBrands(): Promise<BrandsInterface[]> {
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
            cache: 'no-store'
        })
        if (!data.ok) throw new Error("Error occured, please try again.")
        const payload: BrandsRoot = await data.json()
        return payload?.data
    } catch (error) {
        throw new Error("Error occured, please try again.")
    }
}

export async function getSingleBrand(id: string): Promise<BrandsInterface> {
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
            cache: 'no-store'
        })
        if (!data.ok) throw new Error("Error occured, please try again.")
        const payload = await data.json()
        return payload?.data
    } catch (error) {
        throw new Error("Error occured, please try again.")
    }
}

export async function getProductsByBrand(brandId: string): Promise<productsInterface[]> {
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}&limit=20`, {
            cache: 'no-store'
        })
        if (!data.ok) throw new Error("Error occured, please try again.")
        const payload: Root = await data.json()
        return payload?.data ?? []
    } catch (error) {
        throw new Error("Error occured, please try again.")
    }
}