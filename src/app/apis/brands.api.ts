import { productsInterface, Root } from "@/interfaces/product.interface";

export interface BrandsInterface {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandsRoot {
  results: number;
  data: BrandsInterface[];
}

export async function getBrands(): Promise<BrandsInterface[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brands");
  const payload: BrandsRoot = await res.json();
  return payload?.data || [];
}

export async function getSingleBrand(id: string): Promise<BrandsInterface> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
      cache: "no-store",
      next: { revalidate: 0 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch brand");
  const payload = await res.json();
  return payload?.data;
}

export async function getProductsByBrand(
  brandId: string,
): Promise<productsInterface[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}&limit=20`,
    {
      cache: "no-store",
      next: { revalidate: 0 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const payload: Root = await res.json();
  return payload?.data ?? [];
}
