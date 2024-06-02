import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "./_components/footer"
import BlogHeader from "./_components/header"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@next/third-parties/google"
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<div className="w-full flex flex-col flex-1">
				<BlogHeader />
				<div className="flex flex-1   flex-col items-center py-10 ">
					{children}
				</div>

				<Footer />
			</div>
			<SpeedInsights />
			<Analytics />
			<GoogleAnalytics gaId="G-348XQPBTET" />
		</>
	)
}
