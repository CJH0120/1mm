import Header from "../_components/header"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex flex-1 w-full flex-col sm:flex-row">
			<Header />
			{/* content */}
			{children}
		</div>
	)
}
