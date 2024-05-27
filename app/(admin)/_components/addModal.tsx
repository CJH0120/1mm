"use client"

import { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCategory } from "../_action/createCategory"

const AddModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>("")
	const [path, setPath] = useState<string>("")
	const router = useRouter()
	const handleAdd = async () => {
		if (!path || !value) return
		const add = await createCategory(path, value)
		if (add?.status === "success") {
			setIsModalOpen(false)
			router.refresh()
		} else {
			alert(add?.errorMessage)
		}
	}
	return (
		<>
			<Button variant="ghost" onClick={() => setIsModalOpen(true)}>
				카테고리 추가 {<PlusIcon className="ml-2" />}
			</Button>
			{isModalOpen && (
				<Modal>
					<h2 className="text-lg font-bold text-left ">카테고리 추가</h2>

					<div className="flex flex-col gap-7 text-left my-6">
						<div className="grid w-full max-w-sm items-center gap-3">
							<Label htmlFor="path">Path</Label>
							<Input
								type="path"
								id="path"
								placeholder="path"
								value={path}
								onChange={(e) => setPath(e.target.value)}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-3">
							<Label htmlFor="category">Category</Label>
							<Input
								type="category"
								id="category"
								placeholder="category"
								value={value}
								onChange={(e) => setValue(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex gap-3 justify-center ">
						<Button variant={"ghost"} onClick={() => setIsModalOpen(false)}>
							닫기
						</Button>
						<Button onClick={handleAdd}>추가</Button>
					</div>
				</Modal>
			)}
		</>
	)
}

export default AddModal
