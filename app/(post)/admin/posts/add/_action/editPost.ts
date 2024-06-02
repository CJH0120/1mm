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
			for (const content of updatedContent) {
				let updateContent
				if (content.id) {
					updateContent = await tx.content.update({
						where: {
							id: content.id,
							postId: id,
						},
						data: {
							cupang_link: content.cupang_link,
							productImage: content.productImage,
							title: content.title,
						},
					})
				} else {
					updateContent = await tx.content.create({
						data: {
							postId: id,
							cupang_link: content.cupang_link,
							productImage: content.productImage,
							title: content.title,
						},
					})
				}

				for (const brief of content.briefLists) {
					if (brief.id) {
						await tx.briefList.update({
							where: {
								id: brief.id,
							},
							data: {
								text: brief.text,
							},
						})
					} else {
						await tx.briefList.create({
							data: {
								contentId: updateContent.id,
								text: brief.text,
							},
						})
					}
				}

				for (const comment of content.commentList) {
					if (comment.id) {
						await tx.commentList.update({
							where: {
								id: comment.id,
							},
							data: {
								text: comment.text,
							},
						})
					} else {
						await tx.commentList.create({
							data: {
								contentId: updateContent.id,
								text: comment.text,
							},
						})
					}
				}

				for (const review of content.reiviews) {
					if (review.id) {
						await tx.reviewList.update({
							where: {
								id: review.id,
							},
							data: {
								text: review.text,
							},
						})
					} else {
						await tx.reviewList.create({
							data: {
								contentId: updateContent.id,
								text: review.text,
							},
						})
					}
				}
			}

			return id
		})
	} catch (error) {
		console.error("Error updating post and content:", error)
		throw new Error("Failed to update post and content")
	} finally {
		revalidatePath("/")
		revalidatePath(`/recommend/${id}`)
		await prisma.$disconnect()
	}
}
