import Image from "next/image"
import { prisma } from "@/db/prisma"
import { notFound } from "next/navigation"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata, ResolvingMetadata } from "next"

interface DetailProps {
	id: number
	thumbnail: string
	title: string
	desc: string
	regDate: string
	contents: {
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
		console.log(post)
		return {
			id: post.id,
			thumbnail: post.thumbnail,
			title: post.title,
			desc: post.desc,
			regDate: new Date(post.createdAt).toISOString().split("T")[0],
			contents: post.contents.map((content) => ({
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
		description: data?.desc,
		openGraph: {
			images: [data?.thumbnail ?? ""],
		},
	}
}
const RecommendDetail = async ({ params }: { params: { id: string } }) => {
	const detailData = await getDetail(params.id)

	if (!detailData) return notFound()
	console.log(detailData)
	return (
		<div className="px-5 w-full max-w-[777px]">
			<article className="h-fit">
				<header className="w-full py-[24px]">
					<div className="w-full  relative aspect-video max-h-[300px]  rounded-sm	 ">
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
					<div className="my-[20px]">{detailData.regDate}</div>
				</header>
				<div className="py-5">
					<h3 className="text-base block m-0  text-[rgb(78,89,104)]	">
						{detailData.desc}
					</h3>

					<div className="my-[30px] flex flex-col gap-9">
						<ProductSection contents={detailData.contents} />
						<Quickly contents={detailData.contents} />
					</div>
				</div>
			</article>
		</div>
	)
}

export default RecommendDetail

interface ContentsProps {
	cupang_link: string
	productImage: string
	title: string
	reviewList: { text: string }[]
	commentList: { text: string }[]
	briefLists: { text: string }[]
}

interface QuicklyProps {
	contents: ContentsProps[]
}
const ProductSection = ({ contents }: QuicklyProps) => {
	return (
		<div className="flex flex-col">
			<CardTitle className="text-2xl">추천 리스트 </CardTitle>
			<CardDescription className="my-[15px]">
				이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
				제공받습니다
			</CardDescription>
			<hr className="border" />

			<div className="py-5">
				{contents.map((v, idx) => (
					<Link
						href={v.cupang_link}
						className="w-full flex gap-4 flex-col"
						key={v.cupang_link}
					>
						<div className="w-full  flex gap-2 font-bold    text-xl ">
							{idx + 1}. <h2>{v.title}</h2>{" "}
						</div>

						{/*  상품 영역 */}
						<div className="flex w-full justify-center">
							<div className="relative h-[240px] w-[240px] justify-center ">
								<Image
									style={{ objectFit: "cover" }}
									src={v.productImage}
									alt="thumbnail"
									fill
								/>
							</div>
						</div>
						<div className="w-full flex flex-col">
							<CardTitle className="text-xl py-3 flex gap-3">
								<p>ℹ</p> 상품 설명{" "}
							</CardTitle>
							<ul className="flex flex-col gap-2 px-8  ">
								{v.commentList?.map((comment) => (
									<li
										className="list-dot text-base list-disc"
										key={comment.text}
									>
										{comment.text}
									</li>
								))}
							</ul>
						</div>

						<div className="w-full flex flex-col">
							<CardTitle className="text-xl py-3 flex gap-3">
								<p>🌟</p> 실사용 리뷰
							</CardTitle>
							<ul className="flex flex-col gap-2 px-8  ">
								{v.reviewList?.map((comment) => (
									<li
										className="list-dot text-base list-disc"
										key={comment.text}
									>
										{comment.text}
									</li>
								))}
							</ul>
						</div>
						<div className="w-full  flex justify-center py-5">
							<Button className="max-w-[200px] w-full">최저가 확인</Button>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

const Quickly = ({ contents }: QuicklyProps) => {
	return (
		<div className="flex flex-col gap-4">
			<CardTitle className="text-2xl">💡 게시글 요약</CardTitle>

			{contents.map((v) => (
				<div className="w-full flex gap-4 flex-col" key={v.cupang_link}>
					<div className="border p-5 rounded-sm flex items-center justify-between">
						<div className="flex flex-col">
							<CardTitle className="text-base mb-2">{v.title}</CardTitle>
							{v.briefLists?.map((brief) => (
								<CardDescription className="text-base mb-1 " key={brief.text}>
									{brief.text}
								</CardDescription>
							))}
						</div>

						<Button size={"sm"}>구매하기</Button>
					</div>
				</div>
			))}
		</div>
	)
}
