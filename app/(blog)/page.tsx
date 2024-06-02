import { Skeleton } from "@/components/ui/skeleton"
import BlogCard from "./_components/card"
import { prisma } from "@/db/prisma"
import { API } from "@/interface/api"
import dynamicImport from "next/dynamic"
const DynamicCard = dynamicImport(() => import("./_components/card"), {
	ssr: false,
	loading: () => <Skeleton className="h- w-full" />,
})
export const dynamic = "force-static"
const getItems = async (): Promise<API.BlogCardProps[]> => {
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
}
export default async function Home() {
	const data = await getItems()
	return (
		<div className="max-w-[812px] w-full flex flex-col flex-1 gap-8 p-4">
			{data.map((v) => (
				<DynamicCard {...v} key={v.cardId} />
			))}
		</div>
	)
}
