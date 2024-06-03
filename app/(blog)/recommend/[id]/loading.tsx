import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
	return (
		<div className="px-5 w-full max-w-[777px]">
			<article className="h-fit">
				<header className="w-full ">
					<Skeleton className="w-full  relative aspect-square max-h-[300px]  rounded-sm	 " />
					<Skeleton className="mt-[20px] font-bold text-[rgb(25,31,40)] text-ellipsis   sm:text-2xl text-xl h-[50px]" />
				</header>
				<div className="py-5">
					{/* <DynamicPreview content={detailData.desc} />

					<div className="my-[30px] flex flex-col gap-9">
						<ProductSection
							postId={detailData.id}
							contents={detailData.contents}
						/>
						<Quickly postId={detailData.id} contents={detailData.contents} />
					</div> */}
				</div>
			</article>
		</div>
	)
}
export default Loading
