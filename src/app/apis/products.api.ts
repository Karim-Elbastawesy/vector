import { productsInterface } from "@/interfaces/product.interface"

export async function getProducts():Promise<productsInterface[]>
{
    try {
        const data = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
        if (!data.ok) throw new Error('Error occured, please try again.')
        const payload = await data.json()
        return payload?.data

    } catch (error) {
        throw new Error('Error occured, please try again.')
    }
}