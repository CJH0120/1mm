import { useCurrentEditor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Heading1, Heading2, Heading3, Undo, Redo } from "lucide-react"

const MenuBar = () => {
	const { editor } = useCurrentEditor()

	if (!editor) {
		return null
	}
	return (
		<div className="flex gap-2 items-center justify-start py-3 px-2">
			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("bold") ? "is-active" : "",
				].join(" ")}
			>
				<Bold />
			</Button>

			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("heading", { level: 1 }) ? "is-active" : "",
				].join(" ")}
			>
				<Heading1 />
			</Button>
			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("heading", { level: 2 }) ? "is-active" : "",
				].join(" ")}
			>
				<Heading2 />
			</Button>
			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("heading", { level: 3 }) ? "is-active" : "",
				].join(" ")}
			>
				<Heading3 />
			</Button>

			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("heading", { level: 3 }) ? "is-active" : "",
				].join(" ")}
			>
				<Undo />
			</Button>

			<Button
				size={"icon"}
				variant={"ghost"}
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				className={[
					"p-2",
					"text-lg",

					"w-8",
					"h-8",
					editor.isActive("heading", { level: 3 }) ? "is-active" : "",
				].join(" ")}
			>
				<Redo />
			</Button>
		</div>
	)
}

export default MenuBar
