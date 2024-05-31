import { GenerateHmac } from "@/utils/generateHmac"
import crypto from "crypto"
export async function POST(req: Request) {
	const body = await req.json()
	const { search } = body
	const REQUEST_METHOD = "POST"
	const DOMAIN = "https://api-gateway.coupang.com"
	const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink"

	console.log(GenerateHmac(REQUEST_METHOD, DOMAIN + URL))
	return Response.json({ search })
}
