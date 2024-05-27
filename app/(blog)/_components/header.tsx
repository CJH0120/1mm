"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Props {
	id: number
	path: string
	category_name: string
}
interface HeaderProps {
	category: Props[]
}
const Header = ({ category }: HeaderProps) => {
	const pathName = usePathname()
	return (
		<nav className="flex border w-full max-w-[1200px] mx-auto">
			<div className="flex gap-3">
				<Link href={"/"}>
					<Button variant={pathName === `/` ? "default" : "ghost"}>홈</Button>
				</Link>
				{category?.map((v) => (
					<Link href={`/${v.path}`} key={v.id}>
						<Button
							variant={pathName === `/${v.path}` ? "default" : "ghost"}
							key={v.id}
						>
							{v.category_name}
						</Button>
					</Link>
				))}
			</div>
		</nav>
	)
}

export default Header
