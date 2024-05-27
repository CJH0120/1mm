import { prisma } from "@/db/prisma"
import Header from "./_components/header"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full flex flex-col ">
			<div className="flex   flex-col items-center "> {children}</div>
		</div>
	)
}
