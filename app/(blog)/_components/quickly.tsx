"use client"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { UserSelectLog } from "../_action/useUserSelect"
import { QuicklyProps } from "../recommend/[id]/page"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Quickly = ({ contents, postId }: QuicklyProps) => {
	const handleClick = async (contentId: number) => {
		await UserSelectLog({ contentId, postId })
	}
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
						<Link href={v.cupang_link} target="_blank">
							<Button size={"sm"} onClick={() => handleClick(v.id)}>
								구매하기
							</Button>
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default Quickly
