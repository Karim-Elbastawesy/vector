import { getToken } from "@/lib/auth";
import { getAuthToken } from "@/utilities/getTokenFun";
import { cookies } from "next/headers";
import { json } from "zod";

export async function addToCart(productId: string) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const data = await fetch(`${process.env.API}cart`, {
    method: "post",
    body: JSON.stringify({ productId }),
    headers: { token, "Content-type": "application/json" },
  });
}
