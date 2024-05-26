"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { prisma } from "@/db/prisma"
import { redirect } from "next/navigation"
import clearCookie from "./_action/clearCookie"

const getStatus = async (email: string): Promise<{ status: number }> => {
	return (
		(await prisma.user.findFirst({
			where: {
				email,
			},
			select: {
				status: true,
			},
		})) ?? { status: 0 }
	)
}
export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookie = cookies().get("next-auth.session-token")?.value
	const payload = await decode({
		token: cookie,
		secret: process.env.NEXT_AUTH_SECRET as string,
	})
	const { status } = await getStatus(payload?.email ?? "")

	if (status !== 1) {
		redirect("/logout")
	}
	return children
}
