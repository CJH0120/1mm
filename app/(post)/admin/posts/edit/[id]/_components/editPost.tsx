"use client"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, MinusIcon, ButtonIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CategoryProps } from "../../../add/page"
import { UpdatePost } from "../../../add/_action/editPost"

interface commProps {
	id: number
}
export interface Content {
	briefLists: any[]
	commentList: any[]
	reiviews: any[]
	cupang_link: string
	id?: number
	productImage: string
	title: string
}

interface EditPostProp {
	data: {
		id: number
		title: string
		desc: string
		thumbnail: string
		contents: Content[]
		tag: CategoryProps
	}
	categories: CategoryProps[]
}

const EditPost = ({ categories, data }: EditPostProp) => {
	const router = useRouter()
	const [content, setContent] = useState<Content[]>(data.contents)
	const [category, setCategory] = useState<string>(String(data.tag.id))
	const handleChange = (index: number, name: string, value: string) => {
		setContent((prev) => {
			const updatedContent = prev?.map((item, i) => {
				if (i === index) {
					return { ...item, [name]: value }
				}
				return item
			})
			return updatedContent
		})
	}
	const [title, setTitle] = useState<string>(data.title)
	const [thumbnail, setThumbnail] = useState<string>(data.thumbnail)
	const [desc, setDesc] = useState<string>(data.desc)
	const handleAdd = async () => {
		const id = await UpdatePost(
			data.id,
			title,
			desc,
			thumbnail,
			content,
			Number(category)
		)
		router.push(`/recommend/${id}`)
	}
	return (
		<div className="w-full max-w-[800px] flex flex-col justify-center p-5  mx-auto">
			<div className="w-full flex flex-col gap-3">
				{/*  */}
				<Select onValueChange={(v) => setCategory(v)} value={category}>
					<SelectTrigger className="w-full">
						<SelectValue
							placeholder="카테고리 선택"
							defaultValue={String(category)}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{categories.map((v) => (
								<SelectItem value={String(v.id)} key={v.id}>
									{v.category_name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				{/*  */}
				{thumbnail && (
					<div className="w-full  relative aspect-video max-h-[300px]  rounded-sm ">
						<Image
							style={{ objectFit: "cover" }}
							src={thumbnail}
							alt="thumbnail"
							fill
						/>
					</div>
				)}
				<Input
					value={thumbnail}
					onChange={(e) => setThumbnail(e.target.value)}
					className="w-full flex flex-grow-0 flex-shrink-0 h-[50px] rounded"
					placeholder="썸네일 사진 "
				/>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full flex flex-grow-0 flex-shrink-0 h-[50px] rounded"
					placeholder="제목"
				/>
				<Textarea
					value={desc}
					placeholder="Type your message here."
					onChange={(e) => setDesc(e.target.value)}
				/>
				<Contents
					content={content}
					handleChange={handleChange}
					setContent={setContent}
				/>
			</div>

			<div className="w-full flex justify-center mt-5">
				<Button
					onClick={handleAdd}
					className="max-w-[300px]"
					variant={"destructive"}
				>
					수정
				</Button>
			</div>
		</div>
	)
}
export default EditPost

interface ContentProps {
	content: Content[]
	setContent: React.Dispatch<React.SetStateAction<Content[]>>
	handleChange: (index: number, name: string, value: string) => void
}
const Contents = ({ content, handleChange, setContent }: ContentProps) => {
	const handleAddContent = () => {
		setContent((prev) => [
			...prev,
			{
				productImage: "",
				cupang_link: "",
				title: "",
				thumbnail: "",
				commentList: [""],
				briefLists: [""],
				reiviews: [""],
			},
		])
	}

	const handleMinusContent = () => {
		setContent((prev) => prev.slice(0, -1))
	}
	return (
		<div className="w-full gap-10 flex flex-col">
			<div className="flex gap-3">
				<Button
					className="flex  gap-3 items-center"
					onClick={handleAddContent}
					variant={"outline"}
				>
					콘텐츠 <PlusIcon />
				</Button>

				<Button
					className="flex  gap-3 items-center"
					onClick={handleMinusContent}
					variant={"outline"}
				>
					콘텐츠 삭제 <MinusIcon />
				</Button>
			</div>
			{content?.map((v, index) => (
				<ContentItem
					setContent={setContent}
					key={index}
					{...v}
					handleChange={handleChange}
					index={index}
				/>
			))}
		</div>
	)
}

interface ContentItemProps {
	handleChange: (index: number, name: string, value: string) => void
	index: number
	setContent: React.Dispatch<React.SetStateAction<Content[]>>
}
const ContentItem = ({
	cupang_link,
	commentList,
	reiviews,
	setContent,
	productImage,
	index,
	title,
	briefLists: BriefList,
	handleChange,
}: Content & ContentItemProps) => {
	const [productLists, setProductLists] = useState<string[]>(commentList)
	const [reviews, setReviews] = useState<string[]>(reiviews)
	const [briefLists, setBriefLists] = useState<string[]>(BriefList)

	useEffect(() => {
		setContent((prev) => {
			const updatedContent = [...prev]
			updatedContent[index] = {
				...updatedContent[index],
				commentList: productLists,
				reiviews: reviews,
				briefLists: briefLists,
			}
			return updatedContent
		})
	}, [productLists, reviews, briefLists])
	return (
		<div className="flex  gap-3 flex-col pb-7 border-b">
			<div className="flex flex-col gap-3 w-full justify-between ">
				{productImage && (
					<div className="w-full  relative aspect-video max-w-[250] max-h-[300px]  rounded-sm ">
						<Image
							style={{ objectFit: "cover" }}
							src={productImage}
							alt="thumbnail"
							fill
						/>
					</div>
				)}
				<Input
					name="productImage"
					placeholder="thumbnail"
					value={productImage}
					onChange={(e) => handleChange(index, "productImage", e.target.value)}
				/>
			</div>

			<Input
				name="title"
				placeholder="title"
				value={title}
				onChange={(e) => handleChange(index, "title", e.target.value)}
			/>
			<Input
				name="cupang_link"
				placeholder="쿠팡링크"
				value={cupang_link}
				onChange={(e) => handleChange(index, "cupang_link", e.target.value)}
			/>

			{/* 상품설며ㅑㅇ */}
			<div className="flex flex-col mt-5">
				<CardTitle className="text-xl">
					상품 설명 섹션
					<Button
						size={"icon"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setProductLists((prev) => [...prev, ""])}
					>
						<PlusIcon />
					</Button>
					<Button
						size={"sm"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setProductLists((prev) => prev.slice(0, -1))}
					>
						<MinusIcon />
					</Button>
				</CardTitle>
				<div className="flex flex-col gap-3 mt-4">
					{productLists?.map((v, index) => (
						<Input
							key={index}
							name="productList"
							value={v}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = e.target.value
								setProductLists((prevProductLists) => {
									const newProductLists = [...prevProductLists]
									newProductLists[index] = newValue
									return newProductLists
								})
							}}
						/>
					))}
				</div>
			</div>
			{/* 구매자 리뷰 */}
			<div className="flex flex-col mt-5">
				<CardTitle className="text-xl">
					실사용 리뷰 섹션
					<Button
						size={"sm"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setReviews((prev) => [...prev, ""])}
					>
						<PlusIcon />
					</Button>
					<Button
						size={"sm"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setReviews((prev) => prev.slice(0, -1))}
					>
						<MinusIcon />
					</Button>
				</CardTitle>
				<div className="flex flex-col gap-3 mt-4">
					{reviews?.map((v, index) => (
						<Input
							key={index}
							name="productList"
							value={v}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = e.target.value
								setReviews((prevProductLists) => {
									const newProductLists = [...prevProductLists]
									newProductLists[index] = newValue
									return newProductLists
								})
							}}
						/>
					))}
				</div>
			</div>
			{/* 요약 섹션 */}
			<div className="flex flex-col mt-5">
				<CardTitle className="text-xl">
					요약 섹션
					<Button
						size={"sm"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setBriefLists((prev) => [...prev, ""])}
					>
						<PlusIcon />
					</Button>
					<Button
						size={"sm"}
						variant={"outline"}
						className="mx-2 w-8 h-8 p-1"
						onClick={() => setBriefLists((prev) => prev.slice(0, -1))}
					>
						<MinusIcon />
					</Button>
				</CardTitle>
				<div className="flex flex-col gap-3 mt-4">
					{briefLists?.map((v, index) => (
						<Input
							key={index}
							name="productList"
							value={v}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = e.target.value
								setBriefLists((prevProductLists) => {
									const newProductLists = [...prevProductLists]
									newProductLists[index] = newValue
									return newProductLists
								})
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
