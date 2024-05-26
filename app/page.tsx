"use client"
import { signIn, useSession } from "next-auth/react"

export default function Home() {
	const { data: session } = useSession()

	console.log(session?.user?.email)

	return (
		<main>
			<button onClick={() => signIn()}>SignIn</button>

			<div>Hello world!</div>
		</main>
	)
}
