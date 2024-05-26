"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookie = cookies().get("next-auth.session-token")?.value

	const decoded = await decode({
		token: cookie,
		secret: process.env.NEXT_AUTH_SECRET as string,
	})
	if (decoded?.email !== process.env.PASS_EMAIL) return null

	return children
}
