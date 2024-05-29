"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Props {
	id: number
	path: string
	category_name: string
}
interface HeaderProps {
	category: Props[]
}
const BlogHeader = () => {
	return (
		<div className="flex  flex-col w-full  mx-auto  justify-center border-b sticky top-0  bg-white z-50">
			<nav className="flex justify-center  w-full p-3 border-b ">
				<div className="w-full  flex max-w-[1200px]">
					<Link href={"/"}>
						<div className="flex gap-3 justify-center ">
							<Image
								src={"/logo/logo.webp"}
								alt="logo"
								width={120}
								height={60}
							/>
						</div>
					</Link>
				</div>
			</nav>
		</div>
	)
}

export default BlogHeader
