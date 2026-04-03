import { productsInterface, Root } from "@/interfaces/product.interface"

export interface CategoryInterface {
    _id: string
    name: string
    slug: string
    image: string
}

export interface CategoriesRoot {
    results: number
    data: CategoryInterface[]
}

// Fetch all categories - can be cached
export async function getCategories(): Promise<CategoryInterface[]> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
        next: { revalidate: 3600 }   // Cache for 1 hour
    })
    if (!res.ok) throw new Error("Failed to fetch categories")
    const payload: CategoriesRoot = await res.json()
    return payload?.data || []
}

// Important: This must NOT be cached
export async function getSingleCategory(id: string): Promise<CategoryInterface> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
        cache: 'no-store',        // ← This is the key fix
        next: { revalidate: 0 }
    })
    if (!res.ok) throw new Error("Failed to fetch category")
    const payload = await res.json()
    return payload?.data
}

export async function getProductsByCategory(categoryId: string): Promise<productsInterface[]> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=20`, {
        cache: 'no-store',
        next: { revalidate: 0 }
    })
    if (!res.ok) throw new Error("Failed to fetch products")
    const payload: Root = await res.json()
    return payload?.data ?? []
}