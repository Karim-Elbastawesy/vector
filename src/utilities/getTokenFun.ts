import { cookies } from "next/headers"
import { getToken } from "next-auth/jwt"

export async function getTokenFn(): Promise<string | null> {
    try {
        const cookieStore = await cookies()
        const token = await getToken({
            req: { headers: { cookie: cookieStore.toString() } } as any,
            secret: process.env.NEXTAUTH_SECRET!,
        })
        return (token?.userToken as string) ?? null
    } catch {
        return null
    }
}