/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
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
