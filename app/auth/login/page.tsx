"use client"
import { signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

const LoginPage = () => {
	const handleSubmit = async () => {
		await signIn("google", { callbackUrl: "/admin" })
	}
	useEffect(() => {
		if (!window) return
		handleSubmit()
	}, [])
	return <div></div>
}

export default LoginPage
