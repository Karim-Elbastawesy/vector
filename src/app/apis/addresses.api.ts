const BASE = "https://ecommerce.routemisr.com/api/v1";

export interface AddressInterface {
  _id: string;
  alias: string;
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export async function getAddressesApi(
  token: string,
): Promise<AddressInterface[]> {
  const res = await fetch(`${BASE}/addresses`, {
    headers: { token },
  });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  const payload = await res.json();
  return payload?.data ?? [];
}

export async function addAddressApi(
  token: string,
  address: Omit<AddressInterface, "_id">,
): Promise<AddressInterface[]> {
  const res = await fetch(`${BASE}/addresses`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error("Failed to add address");
  const payload = await res.json();
  return payload?.data ?? [];
}

export async function deleteAddressApi(
  token: string,
  addressId: string,
): Promise<AddressInterface[]> {
  const res = await fetch(`${BASE}/addresses/${addressId}`, {
    method: "DELETE",
    headers: { token },
  });
  if (!res.ok) throw new Error("Failed to delete address");
  const payload = await res.json();
  return payload?.data ?? [];
}
