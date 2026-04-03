const BASE = 'https://ecommerce.routemisr.com/api/v1'

export async function addToWishlistApi(productId: string, token: string) {
    const res = await fetch(`${BASE}/wishlist`, {
        method: 'POST',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    })
    if (!res.ok) throw new Error('Failed to add to wishlist')
    return res.json()
}

export async function removeFromWishlistApi(productId: string, token: string) {
    const res = await fetch(`${BASE}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { token },
    })
    if (!res.ok) throw new Error('Failed to remove from wishlist')
    return res.json()
}

export async function getWishlistApi(token: string) {
    const res = await fetch(`${BASE}/wishlist`, {
        headers: { token },
    })
    if (!res.ok) throw new Error('Failed to fetch wishlist')
    return res.json()
}