"use server"
import { prisma } from "@/db/prisma"
import { Content } from "../_components/addPost"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const AddPost = async (
	title: string,
	desc: string,
	thumbnail: string,
	content: Content[],
	category: number
) => {
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
	console.log(updatedContent)
	try {
		return await prisma.$transaction(async (tx): Promise<number | Error> => {
			const user = await tx.user.findFirstOrThrow({
				where: {
					email: process.env.PASS_EMAIL,
				},
			})

			const post = await tx.post.create({
				data: {
					desc,
					thumbnail,
					title,
					tagId: category,
					userId: user.id,
				},
			})

			for (const v of updatedContent) {
				const contentRecord = await tx.content.create({
					data: {
						cupang_link: v.cupang_link,
						productImage: v.thumbnail,
						title: v.title,
						postId: post.id,
					},
				})

				const commentData = v.productList.map((vv) => ({
					contentId: contentRecord.id,
					text: vv,
				}))

				const briefListData = v.briefList.map((brief) => ({
					contentId: contentRecord.id,
					text: brief,
				}))

				const reviewData = v.review.map((review) => ({
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
			return post.id
		})

		revalidatePath("/")
	} catch (error) {
		console.error("Error creating post and content:", error)
		throw new Error("Failed to create post and content")
	}
}
