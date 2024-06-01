import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { API } from "@/interface/api"

const BlogCard = ({
	cardDesc,
	cardId,
	cardThumbnail,
	cardTitle,
	regDate,
}: API.BlogCardProps) => {
	return (
		<Link href={`/recommend/${cardId}`} className=" cursor-pointer  group">
			<article className="w-full flex gap-4 flex-col">
				<div className="w-full flex gap-4 sm:flex-row  flex-col-reverse">
					<div className="w-full  flex flex-col gap-2 ">
						<h2 className="font-bold text-[rgb(25,31,40)] text-ellipsis   text-lg group-hover:text-primary">
							{cardTitle}
						</h2>
						<h3 className="line-clamp-4 	  text-base  m-0  text-[rgb(78,89,104)]	">
							{cardDesc}
						</h3>
					</div>

					<div className="w-full sm:w-[120px] flex h-auto aspect-video sm:aspect-auto		  relative sm:h-[120px] flex-shrink-0 flex-grow-0 basis-auto">
						<Image
							style={{ objectFit: "cover" }}
							src={cardThumbnail}
							alt="s"
							fill
						/>
					</div>
				</div>
				<div className="text-base block m-0  text-[rgb(78,89,104)]">
					{new Date(regDate).toISOString().split("T")[0]}
				</div>
			</article>
		</Link>
	)
}
export default BlogCard
