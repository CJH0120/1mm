"use client"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, MinusIcon, ButtonIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { CategoryProps } from "../page"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { AddPost } from "../_action/addPost"
import Editor from "@/components/comm/Editor"

export interface Content {
	title: string
	thumbnail: string
	productList: string[]
	review: string[]
	briefList: string[]
}

interface PostAdd {
	categories: CategoryProps[]
}
const PostAdd = ({ categories }: PostAdd) => {
	const router = useRouter()
	const [content, setContent] = useState<Content[]>([
		{
			title: "",
			thumbnail: "",
			briefList: [""],
			productList: [""],
			review: [""],
		},
	])
	const [category, setCategory] = useState<string>("")
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
	const [title, setTitle] = useState<string>("")
	const [thumbnail, setThumbnail] = useState<string>("")
	const [desc, setDesc] = useState<string>("")
	useEffect(() => {
		console.log(desc)
	}, [desc])
	const handleAdd = async () => {
		const id = await AddPost(title, desc, thumbnail, content, Number(category))
		router.push(`/recommend/${id}`)
	}
	return (
		<div className="w-full max-w-[800px] flex flex-col justify-center p-5  mx-auto">
			<div className="w-full flex flex-col gap-3">
				{/*  */}
				<Select onValueChange={(v) => setCategory(v)}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="카테고리 선택" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{categories?.map((v) => (
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
				<Editor content={desc} setContent={setDesc} />
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
					게시
				</Button>
			</div>
		</div>
	)
}
export default PostAdd

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
				title: "",
				productList: [""],
				thumbnail: "",
				briefList: [""],
				cupangLink: "",
				review: [""],
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
	briefList,
	productList,
	review,
	setContent,
	thumbnail,
	index,
	title,
	handleChange,
}: Content & ContentItemProps) => {
	const [productLists, setProductLists] = useState<string[]>(productList)
	const [reviews, setReviews] = useState<string[]>(review)
	const [briefLists, setBriefLists] = useState<string[]>(briefList)

	useEffect(() => {
		setContent((prev) => {
			const updatedContent = [...prev]
			updatedContent[index] = {
				...updatedContent[index],
				productList: productLists,
				review: reviews,
				briefList: briefLists,
			}
			return updatedContent
		})
	}, [productLists, reviews, briefLists])
	return (
		<div className="flex  gap-3 flex-col">
			<div className="flex flex-col gap-3 w-full justify-between ">
				{thumbnail && (
					<div className="w-full  relative aspect-video max-w-[250] max-h-[300px]  rounded-sm ">
						<Image
							style={{ objectFit: "cover" }}
							src={thumbnail}
							alt="thumbnail"
							fill
						/>
					</div>
				)}
				<Input
					name="thumbnail"
					placeholder="thumbnail"
					value={thumbnail}
					onChange={(e) => handleChange(index, "thumbnail", e.target.value)}
				/>
			</div>

			<Input
				name="title"
				placeholder="title"
				value={title}
				onChange={(e) => handleChange(index, "title", e.target.value)}
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
