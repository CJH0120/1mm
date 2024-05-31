import crypto from "crypto"
import moment from "moment"

export const GenerateHmac = (method: string, url: string) => {
	const now = new Date()
	const parts = url.split(/\?/)
	const [path, query = ""] = parts
	const dateTime = moment.utc().format("YYMMDD[T]HHmmss[Z]")
	const message = dateTime + method + path + query

	const signature = crypto
		.createHmac("sha256", process.env.CUPANG_SECRET_KEY ?? "")
		.update(message)
		.digest("hex")

	return `CEA algorithm=HmacSHA256, access-key=${process.env.CUPANG_ACCESS_KEY}, signed-date=${dateTime}, signature=${signature}`
}
