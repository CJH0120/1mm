"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { prisma } from "@/db/prisma"
import { redirect } from "next/navigation"

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
