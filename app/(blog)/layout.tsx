import BlogHeader from "./_components/header"
import { Metadata } from "next"
import image from "@/public/logo/og.png"
export const metadata: Metadata = {
	title: {
		template: "%s - Blog",
		default: "1MM",
	},

	description:
		"1mm은 일상생활에서 필요한 제품을 가성비,리뷰로 비교하며 여러분에게 더욱 유익한 정보를 전달해 드립니다.  ",
	openGraph: {
		images: image.src,
		title: "1MM",
		description:
			"1mm은 일상생활에서 필요한 제품을 가성비,리뷰로 비교하며 여러분에게 더욱 유익한 정보를 전달해 드립니다.  ",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="w-full flex flex-col ">
			<BlogHeader />
			<div className="flex   flex-col items-center "> {children}</div>
		</div>
	)
}
