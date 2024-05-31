"use server"
import { prisma } from "@/db/prisma"
import { Content } from "../../edit/[id]/_components/editPost"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const UpdatePost = async (
	id: number,
	title: string,
	desc: string,
	thumbnail: string,
	content: Content[],
	category: number
): Promise<number | Error> => {
	const contents = content.map((content) => {
		return content.title
	})
	const cupang_links = await fetch(process.env.URL + "/api/cupang/encode", {
		method: "POST",
		body: JSON.stringify({ search: contents }),
	}).then((res) => res.json())
	const updatedContent = content.map((content, index) => ({
		...content,
		cupang_link: cupang_links.shortenUrls[index],
	}))

	try {
		return await prisma.$transaction(async (tx) => {
			await tx.post.update({
				where: {
					id: id,
				},
				data: {
					title: title,
					desc: desc,
					thumbnail: thumbnail,
					tagId: category,
				},
			})
			await tx.briefList.deleteMany({
				where: {
					Content: {
						postId: id,
					},
				},
			})

			await tx.commentList.deleteMany({
				where: {
					Content: {
						postId: id,
					},
				},
			})

			await tx.reviewList.deleteMany({
				where: {
					Content: {
						postId: id,
					},
				},
			})

			await tx.content.deleteMany({
				where: {
					postId: id,
				},
			})

			for (const v of updatedContent) {
				const contentRecord = await tx.content.create({
					data: {
						cupang_link: v.cupang_link,
						productImage: v.productImage,
						title: v.title,
						postId: id,
					},
				})

				const commentData = v.commentList.map((vv) => ({
					contentId: contentRecord.id,
					text: vv,
				}))

				const briefListData = v.briefLists.map((brief) => ({
					contentId: contentRecord.id,
					text: brief,
				}))

				const reviewData = v.reiviews.map((review) => ({
					contentId: contentRecord.id,
					text: review,
				}))

				if (commentData.length > 0) {
					await tx.commentList.createMany({ data: commentData })
				}

				if (briefListData.length > 0) {
					await tx.briefList.createMany({ data: briefListData })
				}

				if (reviewData.length > 0) {
					await tx.reviewList.createMany({ data: reviewData })
				}
			}
			revalidatePath("/")
			revalidatePath(`/recommend/${id}`)
			return id
		})
	} catch (error) {
		console.error("Error updating post and content:", error)
		throw new Error("Failed to update post and content")
	}
}
