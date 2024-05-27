"use client"
import exp from "constants"
import Image from "next/image"
import logo from "@/public/logo/logo.webp"
import Link from "next/link"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import HamburgerMenu from "./hamburgetMenu"

const Header = () => {
	const headerMenu: { name: string; href: string }[] = [
		{ href: "tags", name: "태그" },
		{ href: "posts", name: "게시글" },
		{ href: "settings", name: "설정" },
	]
	const pathname = usePathname().replaceAll("/admin/", "")
	return (
		<div
			className="flex flex-grow-0 flex-shrink-0 justify-between w-full sm:w-[200px] sm:border
      p-3 
    "
		>
			<div className="w-full flex flex-row gap-4 sm:flex-col justify-between sm:justify-start items-center">
				<div className="relative w-full max-w-[120px] sm:w-full sm:max-w-full aspect-[708/318] ">
					<Link href={"/admin"}>
						<Image src={logo.src} fill alt="logo" draggable={false} />
					</Link>
				</div>
				{/* 태그 */}
				<div className="hidden flex-col gap-3 sm:flex w-full">
					{headerMenu.map((menu) => (
						<Link
							className="w-full"
							href={`/admin/${menu.href}`}
							key={menu.href}
						>
							<Button
								variant={pathname === menu.href ? "default" : "ghost"}
								className="w-full"
							>
								{menu.name}
							</Button>
						</Link>
					))}
				</div>

				{/* 햄버거 매뉴 */}
				<div className="sm:hidden block">
					<HamburgerMenu />
				</div>
			</div>
		</div>
	)
}

export default Header
