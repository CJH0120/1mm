"use server"
import { prisma } from "@/db/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { decode } from "next-auth/jwt"
import { revalidatePath } from "next/cache"
export const createCategory = async (path: string, name: string) => {
	const token = cookies().get("1mm-auth")
	const payload = await decode({
		token: token?.value,
		secret: process.env.NEXT_AUTH_SECRET as string,
	})

	if (!payload) return redirect("/")
	if (payload.email !== process.env.NEXT_PUBLIC_PASS_EMAIL) return redirect("/")
	console.log(payload)
	const user = await prisma.user.findFirstOrThrow({
		where: {
			email: payload.email,
		},
		select: { id: true },
	})

	if (payload) {
		try {
			await prisma.tag.create({
				data: {
					category_name: name,
					path: path,
					userId: user.id,
				},
			})
			revalidatePath("/admin/")
			return { status: "success" }
		} catch (error) {
			console.log(error)
			return { status: "error", errorMessage: "중복된 데이터." }
		}
	}
}
