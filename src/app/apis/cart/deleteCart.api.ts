const BASE = 'https://ecommerce.routemisr.com/api/v1'

export async function deleteCartItemApi(productId: string, token: string) {
    const res = await fetch(`${BASE}/cart/${productId}`, {
        method: 'DELETE',
        headers: { token },
    })
    if (!res.ok) throw new Error('Failed to remove item')
    return res.json()
}