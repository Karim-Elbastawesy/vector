const BASE = 'https://ecommerce.routemisr.com/api/v1'

export async function updateCartItemApi(productId: string, count: number, token: string) {
    const res = await fetch(`${BASE}/cart/${productId}`, {
        method: 'PUT',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ count }),
    })
    if (!res.ok) throw new Error('Failed to update item')
    return res.json()
}