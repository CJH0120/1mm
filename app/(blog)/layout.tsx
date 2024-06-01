import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "./_components/footer"
import BlogHeader from "./_components/header"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<SpeedInsights />
			<Analytics />

			<div className="w-full flex flex-col flex-1">
				<BlogHeader />
				<div className="flex flex-1   flex-col items-center py-10 ">
					{children}
				</div>

				<Footer />
			</div>
		</>
	)
}
