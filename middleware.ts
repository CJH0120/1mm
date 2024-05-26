import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import clearCookie from "./app/(admin)/admin/_action/clearCookie"
export const config = {
	runtime: "nodejs",
}
export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get("1mm-auth")

	const payload = await decode({
		token: cookie?.value,
		secret: process.env.NEXT_AUTH_SECRET as string,
	})
	if (request.nextUrl.pathname.startsWith("/auth/login")) {
		if (!payload) return

		return NextResponse.redirect(new URL("/admin", request.url))
	}
	if (request.nextUrl.pathname.startsWith("/admin")) {
		if (!payload) {
			const response = NextResponse.redirect(new URL("/", request.url))
			return response
		}
	}

	if (request.nextUrl.pathname.startsWith("/logout")) {
		const response = NextResponse.redirect(new URL("/", request.url))
		console.log(cookie?.name)
		return response
	}

	return NextResponse.next()
}
