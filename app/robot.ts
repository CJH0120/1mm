export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/admin/*", "/auth/*", "/api/*"],
			},
		],
		sitemap: `https://1mm.creation.im/sitemap.xml`,
	}
}
