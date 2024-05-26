import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
export const config = {
	runtime: "nodejs",
}
export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get("next-auth.session-token")
	const payload = await decode({
		token: cookie?.value,
		secret: process.env.NEXT_AUTH_SECRET as string,
	})

	if (request.nextUrl.pathname.startsWith("/auth/login")) {
		if (!payload) return

		return NextResponse.redirect(new URL("/admin", request.url))
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		if (!payload || payload?.email !== process.env.PASS_EMAIL) {
			const response = NextResponse.redirect(new URL("/", request.url))
			const cookieArray = cookies()
				.getAll()
				.map((cookie) => cookie.name)
			await Promise.all(
				cookieArray.map((cookie) => response.cookies.delete(cookie))
			)
			return response
		}
	}

	return NextResponse.next()
}
