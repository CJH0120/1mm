import Image from "next/image"
import { prisma } from "@/db/prisma"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import Quickly from "../../_components/quickly"
import ProductSection from "../../_components/productSection"

export const dynamic = "force-static"
export const revalidate = false

import dynamicImport from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
const DynamicPreview = dynamicImport(
	() => import("@/components/comm/Preview"),

	{
		ssr: false,
		loading: () => <Skeleton className="w-full h-full min-h-[150px] " />,
	}
)
interface DetailProps {
	id: number
	thumbnail: string
	title: string
	desc: string
	regDate: string
	contents: {
		id: number
		cupang_link: string
		productImage: string
		title: string
		commentList: { text: string }[]
		reviewList: { text: string }[]
		briefLists: { text: string }[]
	}[]
}
const getDetail = async (id: string): Promise<DetailProps | null> => {
	try {
		const post = await prisma.post.findFirstOrThrow({
			where: { id: Number(id) },
			include: {
				contents: {
					include: {
						commentList: true,
						briefLists: true,
						reiviews: true,
					},
				},
			},
		})

		return {
			id: post.id,
			thumbnail: post.thumbnail,
			title: post.title,
			desc: post.desc,
			regDate: new Date(post.createdAt).toISOString().split("T")[0],
			contents: post.contents.map((content) => ({
				id: content.id,
				cupang_link: content.cupang_link,
				productImage: content.productImage,
				title: content.title,
				reviewList: content.reiviews.map((review) => ({ text: review.text })),
				commentList: content.commentList.map((comment) => ({
					text: comment.text,
				})),
				briefLists: content.briefLists.map((brief) => ({ text: brief.text })),
			})),
		}
	} catch (error) {
		return null
	} finally {
		await prisma.$disconnect()
	}
}
type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = params.id
	const data = await getDetail(id)
	return {
		title: data?.title,
		description: data?.desc.replace(/(<([^>]+)>)/gi, ""),
		openGraph: {
			images: [data?.thumbnail ?? ""],
		},
	}
}
const RecommendDetail = async ({ params }: { params: { id: string } }) => {
	const detailData = await getDetail(params.id)

	if (!detailData) return notFound()
	return (
		<div className="px-5 w-full max-w-[777px]">
			<article className="h-fit">
				<header className="w-full ">
					<div className="w-full  relative aspect-square max-h-[300px]  rounded-sm	 ">
						<Image
							style={{ objectFit: "cover" }}
							src={detailData.thumbnail}
							alt="thumbnail"
							fill
						/>
					</div>
					<h1 className="mt-[20px] font-bold text-[rgb(25,31,40)] text-ellipsis   sm:text-2xl text-xl">
						{detailData.title}
					</h1>
					<div className="mt-[20px]">{detailData.regDate}</div>
				</header>
				<div className="py-5">
					<div className="min-h-[150px]">
						<DynamicPreview content={detailData.desc} />
					</div>

					<div className="my-[30px] flex flex-col gap-9">
						<ProductSection
							postId={detailData.id}
							contents={detailData.contents}
						/>
						<Quickly postId={detailData.id} contents={detailData.contents} />
					</div>
				</div>
			</article>
		</div>
	)
}

export default RecommendDetail

interface ContentsProps {
	id: number
	cupang_link: string
	productImage: string
	title: string
	reviewList: { text: string }[]
	commentList: { text: string }[]
	briefLists: { text: string }[]
}

export interface QuicklyProps {
	contents: ContentsProps[]
	postId: number
}
