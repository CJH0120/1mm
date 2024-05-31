import crypto from "crypto"
export const GenerateHmac = (method: string, url: string) => {
	const now = new Date()
	const parts = url.split(/\?/)
	const [path, query = ""] = parts
	const formattedDate = formatDate(now)
	const message = formattedDate + method + path + query

	const signature = crypto
		.createHmac("sha256", process.env.CUPANG_SECRET_KEY ?? "")
		.update(message)
		.digest("hex")

	return `CEA algorithm=HmacSHA256, access-key=${process.env.CUPANG_ACCESS_KEY}, signed-date=${formattedDate}, signature=${signature}`
}

const formatDate = (date: Date) => {
	const pad = (n: number): string => (n < 10 ? "0" + n : n.toString())

	const year = date.getUTCFullYear().toString().slice(2)
	const month = pad(date.getUTCMonth() + 1)
	const day = pad(date.getUTCDate())
	const hours = pad(date.getUTCHours())
	const minutes = pad(date.getUTCMinutes())
	const seconds = pad(date.getUTCSeconds())

	return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}
