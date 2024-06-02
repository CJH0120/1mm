"use server"
import { prisma } from "@/db/prisma"

interface Props {
	contentId: number
	postId: number
}
export const UserSelectLog = async ({ contentId, postId }: Props) => {
	try {
		return await prisma.userSelect.create({
			data: {
				contentId,
				postId,
			},
		})
	} catch (error) {
		return null
	} finally {
		await prisma.$disconnect()
	}
}
