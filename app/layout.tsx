import type { Metadata } from "next"
import "./globals.css"
import AuthContext from "@/utils/AuthContext"
import image from "@/public/logo/og.png"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@next/third-parties/google"

export const metadata: Metadata = {
	title: {
		template: "%s - 1MM",
		default: "1MM",
	},
	metadataBase: new URL("https://1mm.creation.im"),
	description:
		"1mm은 일상생활에서 필요한 제품을 가성비,리뷰로 비교하며 여러분에게 더욱 유익한 정보를 전달해 드립니다.  ",
	openGraph: {
		images: image.src,
		url: "https://1mm.creation.im",
		type: "article",
		siteName: "1MM",
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
		<html lang="kr">
			<head>
				<meta
					name="naver-site-verification"
					content="c234979fafb9c7228f99f0d62b28e87a3ac7ba64"
				/>
			</head>

			<body>
				<AuthContext>
					<main className="min-h-screen flex flex-col">{children}</main>
				</AuthContext>
			</body>
			<GoogleAnalytics gaId="G-348XQPBTET" />
		</html>
	)
}
