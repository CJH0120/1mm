import { MetadataRoute } from "next"
import { prisma } from "@/db/prisma"

const generateSitemaps = async () => {
	return await prisma.post.findMany({
		select: {
			createdAt: true,
			id: true,
		},
	})
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await generateSitemaps()

	const posts = data.map((post) => ({
		url: `https://1mm.creation.im/recommend${post.id}`,
		lastModified: post.createdAt,
		changeFrequency: "weekly" as
			| "monthly"
			| "always"
			| "hourly"
			| "daily"
			| "weekly"
			| "yearly"
			| "never",
		priority: 0.7,
	}))
	posts.push({
		url: "https://1mm.creation.im",
		lastModified: new Date(),
		changeFrequency: "always",
		priority: 1,
	})

	return posts
}
