import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieToken = await cookies();
  const authToken =
    cookieToken.get("next-auth.session-token")?.value ||
    cookieToken.get("__Secure-next-auth.session-token")?.value;

  const decodedToken = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decodedToken?.userToken as string | undefined;
}
