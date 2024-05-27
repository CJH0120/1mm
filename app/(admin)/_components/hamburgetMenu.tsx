"use client"

import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<>
			<Button size={"icon"}>
				<HamburgerMenuIcon />
			</Button>
			<div className="w-full absolute top-[78px] left-0 z-10">asdsad</div>
		</>
	)
}
export default HamburgerMenu
