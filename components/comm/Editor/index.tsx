"use client"
import "./editor.css"

import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { Dispatch, SetStateAction, useRef } from "react"
import MenuBar from "./head"

interface EditorProps {
	content: string
	setContent: Dispatch<SetStateAction<string>>
}

const Editor = ({ content, setContent }: EditorProps) => {
	const extensions = [StarterKit]
	return (
		<EditorProvider
			slotBefore={<MenuBar />}
			extensions={extensions}
			content={content}
			onUpdate={({ editor }) => setContent(editor.getHTML())}
		/>
	)
}
export default Editor
