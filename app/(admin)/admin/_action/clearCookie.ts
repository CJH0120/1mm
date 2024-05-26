"use server"

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export default async function clearCookie() {
	const allCookies = cookies().getAll()
	console.log(allCookies)
	const response = NextResponse.next()
	await new Promise<void>((resolve) => {
		allCookies.map((cookie) => {
			response.cookies.delete(cookie)
		})
		resolve()
	})
	console.log(cookies().getAll())
	return response
}
