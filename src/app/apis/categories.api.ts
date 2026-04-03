import { productsInterface, Root } from "@/interfaces/product.interface";

export interface CategoryInterface {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoriesRoot {
  results: number;
  data: CategoryInterface[];
}

export async function getCategories(): Promise<CategoryInterface[]> {
  try {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
      {
        cache: "no-store",
      },
    );
    if (!data.ok) throw new Error("Error occured, please try again.");
    const payload: CategoriesRoot = await data.json();
    return payload?.data;
  } catch (error) {
    throw new Error("Error occured, please try again.");
  }
}

export async function getSingleCategory(
  id: string,
): Promise<CategoryInterface> {
  try {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!data.ok) throw new Error("Error occured, please try again.");
    const payload = await data.json();
    return payload?.data;
  } catch (error) {
    throw new Error("Error occured, please try again.");
  }
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<productsInterface[]> {
  try {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=20`,
      {
        cache: "no-store",
      },
    );
    if (!data.ok) throw new Error("Error occured, please try again.");
    const payload: Root = await data.json();
    return payload?.data ?? [];
  } catch (error) {
    throw new Error("Error occured, please try again.");
  }
}
