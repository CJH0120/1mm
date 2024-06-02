/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [120, 500],
	},
	experimental: {
		webVitalsAttribution: ["CLS", "LCP"],
		optimizePackageImports: [
			"@tiptap/pm",
			"@tiptap/react",
			"@tiptap/starter-kit",
			"lucide-react",
		],
		serverActions: {
			bodySizeLimit: "2mb",
		},
		typedRoutes: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
				pathname: "**",
			},
		],
	},
}

export default nextConfig
