"use server"
import { prisma } from "@/db/prisma"

interface Props {
	contentId: number
	postId: number
}
export const UserSelectLog = async ({ contentId, postId }: Props) => {
	return await prisma.userSelect.create({
		data: {
			contentId,
			postId,
		},
	})
}
