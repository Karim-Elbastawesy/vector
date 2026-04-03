import { productsInterface, Root } from "@/interfaces/product.interface"

export async function getSingleProducts(id: string): Promise<productsInterface> {
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        if (!data.ok) throw new Error('Error occured, please try again.')
        const payload = await data.json()
        return payload?.data
    } catch (error) {
        throw new Error('Error occured, please try again.')
    }
}

export async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<productsInterface[]> {
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=10`)
        if (!data.ok) throw new Error('Error occured, please try again.')
        const payload: Root = await data.json()
        return payload?.data?.filter(p => p._id !== currentProductId) ?? []
    } catch (error) {
        throw new Error('Error occured, please try again.')
    }
}