"use client"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { QuicklyProps } from "../recommend/[id]/page"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserSelectLog } from "../_action/useUserSelect"

const ProductSection = ({ contents, postId }: QuicklyProps) => {
	const handleClick = async (contentId: number) => {
		await UserSelectLog({ contentId, postId })
	}
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
						onClick={() => handleClick(v.id)}
						target="_blank"
						href={v.cupang_link}
						className="w-full flex gap-4 flex-col py-5 border-b"
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

export default ProductSection
