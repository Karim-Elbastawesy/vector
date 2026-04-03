const BASE = 'https://ecommerce.routemisr.com/api/v1'

export async function addToCartApi(productId: string, token: string) {
    const res = await fetch(`${BASE}/cart`, {
        method: 'POST',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    })
    if (!res.ok) throw new Error('Failed to add to cart')
    return res.json()
}

export async function getCartApi(token: string) {
    const res = await fetch(`${BASE}/cart`, {
        headers: { token },
    })
    if (!res.ok) throw new Error('Failed to fetch cart')
    return res.json()
}