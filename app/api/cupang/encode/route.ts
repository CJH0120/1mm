import { GenerateHmac } from "@/utils/generateHmac"
import crypto from "crypto"
export async function POST(req: Request) {
	const body = await req.json()
	const { search } = body
	const REQUEST_METHOD = "POST"
	const DOMAIN = "https://api-gateway.coupang.com"
	const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink"
	const authorization = GenerateHmac(REQUEST_METHOD, URL)
	const searchURI = encodeURI(search)

	const searchArray: string[] = search

	const deepLinks = searchArray.map((item) => {
		const searchURI = encodeURI(item)
		return `https://www.coupang.com/np/search?rocketAll=true&component=&q=${searchURI}&channel=user`
	})
	const REQUEST = {
		coupangUrls: deepLinks,
		subId: "AF9387002",
	}

	const res = await fetch(`${DOMAIN}${URL}`, {
		method: REQUEST_METHOD,
		headers: {
			"content-type": "application/json",
			Authorization: authorization,
		},
		body: JSON.stringify(REQUEST),
	}).then((v) => v.json())
	const shortenUrls = res.data.map(
		(item: { shortenUrl: any }) => item.shortenUrl
	)
	console.log(shortenUrls)
	return Response.json({ shortenUrls })
}
