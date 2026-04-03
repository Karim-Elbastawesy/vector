import { getToken } from "@/lib/auth";
import { getTokenFn } from "@/utilities/getTokenFun";
import { cookies } from "next/headers";
import { json } from "zod";

export async function addToCart(productId: string) {
  
    const token = await getTokenFn()
    

    if (!token) {
        throw new Error("Unauthorized")

    }

  const data = await fetch(`${process.env.API}cart`, {
    method: "post",
    body: JSON.stringify({ productId }),
    headers: { token, "Content-type": "application/json" },
  });
    
}
