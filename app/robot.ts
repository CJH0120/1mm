import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/auth/*", "/api/*", "/admin/*"],
		},
		sitemap: "https://1mm.creation.im/sitemap.xml",
	}
}
