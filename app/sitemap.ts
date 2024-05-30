import { MetadataRoute } from "next"
import { prisma } from "@/db/prisma"

const WEBSITE_HOST_URL = "https://1mm.creation.im"

type ChangeFrequency =
	| "always"
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "never"

const getPosts = async () => {
	return prisma.post.findMany({
		select: {
			id: true,
			createdAt: true,
		},
	})
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts()
	const changeFrequency: ChangeFrequency = "daily"

	const postRoutes = posts.map(({ id, createdAt }) => ({
		url: `${WEBSITE_HOST_URL}/recommend/${id}`,
		lastModified: createdAt.toISOString(),
		changeFrequency,
	}))

	const routes = [""].map((route) => ({
		url: `${WEBSITE_HOST_URL}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency,
	}))

	return [...routes, ...postRoutes]
}
