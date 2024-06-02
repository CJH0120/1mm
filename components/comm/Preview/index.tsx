"use client"
import "./preview.css"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface Props {
	content: string
	className?: string
}
const Preview = ({ content, className }: Props) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
		editable: false,
	})
	return (
		<EditorContent
			className={className}
			editor={editor}
			contentEditable="false"
		/>
	)
}

export default Preview
