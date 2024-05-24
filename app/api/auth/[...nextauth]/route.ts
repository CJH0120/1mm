import { PrismaAdapter } from "@next-auth/prisma-adapter"

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/db/prisma"
const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXT_AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.NEXT_AUTH_SECRET,
	},
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {},
})

export { handler as GET, handler as POST }
