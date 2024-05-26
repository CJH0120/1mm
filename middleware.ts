import { decode } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

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
			response.cookies.delete("next-auth.session-token")

			return response
		}
	}

	return NextResponse.next()
}
