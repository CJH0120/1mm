import { Skeleton } from "@/components/ui/skeleton"
import { prisma } from "@/db/prisma"
import { API } from "@/interface/api"
import dynamicImport from "next/dynamic"
import BlogCard from "./_components/card"

export const dynamic = "force-static"
const getItems = async (): Promise<API.BlogCardProps[]> => {
	try {
		const data = prisma.post.findMany({
			select: {
				thumbnail: true,
				id: true,
				desc: true,
				title: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})
		return (await data).map((post: any) => ({
			cardId: post.id,
			cardTitle: post.title,
			cardDesc: post.desc,
			cardThumbnail: post.thumbnail,
			regDate: post.createdAt.toISOString(),
		}))
	} catch (error) {
		return []
	} finally {
		await prisma.$disconnect()
	}
}
export default async function Home() {
	const data = await getItems()
	return (
		<div className="max-w-[812px] w-full flex flex-col flex-1 gap-8 p-4">
			{data?.map((v) => (
				<BlogCard {...v} key={v.cardId} />
			))}
		</div>
	)
}
