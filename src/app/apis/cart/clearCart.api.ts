const BASE = 'https://ecommerce.routemisr.com/api/v1'

export async function clearCartApi(token: string) {
    const res = await fetch(`${BASE}/cart`, {
        method: 'DELETE',
        headers: { token },
    })
    if (!res.ok) throw new Error('Failed to clear cart')
    return res.json()
}