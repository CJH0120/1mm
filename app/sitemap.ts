"use server"
import { MetadataRoute } from "next"
import { prisma } from "@/db/prisma"
const WEBSITE_HOST_URL = "https://1mm.creation.im"
type changeFrequency =
	| "always"
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "never"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let post = await prisma.post.findMany({
		select: {
			id: true,
			createdAt: true,
		},
	})
	const changeFrequency = "daily" as changeFrequency

	const posts = post.map(({ id, createdAt }) => ({
		url: `${WEBSITE_HOST_URL}/recommend/${id}`,
		lastModified: createdAt.toISOString(),
		changeFrequency,
	}))

	const routes = [""].map((route) => ({
		url: `${WEBSITE_HOST_URL}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency,
	}))

	return [...routes, ...posts]
}
