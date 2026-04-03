const BASE = "https://ecommerce.routemisr.com/api/v1";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export async function cashCheckoutApi(
  cartId: string,
  token: string,
  shippingAddress: ShippingAddress,
) {
  const res = await fetch(`${BASE}/orders/${cartId}`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ shippingAddress }),
  });
  if (!res.ok) throw new Error("Failed to place order");
  return res.json();
}

export async function onlineCheckoutApi(
  cartId: string,
  token: string,
  shippingAddress: ShippingAddress,
) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const res = await fetch(
    `${BASE}/orders/checkout-session/${cartId}?url=${origin}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
    },
  );
  if (!res.ok) throw new Error("Failed to create payment session");
  const payload = await res.json();
  return payload?.session?.url as string;
}
