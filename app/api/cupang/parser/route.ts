import axios from "axios"
import * as cheerio from "cheerio"
export async function POST(req: Request) {
	const body = await req.json()
	const { itemURL } = body
	const headers = {
		"User-Agent":
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
		"Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
		Referer: "https://www.coupang.com/",
	}

	console.log(itemURL)
	try {
		const urls: string[] = []
		const getDetailItem = itemURL.map(async (v: string) => {
			const response = await axios.get(v, { headers })
			const html = response.data
			const $ = cheerio.load(html)
			const src = $(".prod-image__detail").attr("src")
			const url = "https:" + src
			urls.push(url)
		})
		await Promise.all(getDetailItem)
		return Response.json(urls)
	} catch (error) {
		console.error(`Problem with request: ${(error as Error).message}`)
		return Response.json({})
	}
}
