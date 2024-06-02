import { prisma } from "@/db/prisma"
import EditPost, { Content } from "./_components/editPost"
import { CategoryProps, getCategory } from "../../add/page"
export const dynamic = "force-dynamic"
const getPosts = async (
	id: string
): Promise<{
	id: number
	title: string
	desc: string
	thumbnail: string
	contents: Content[]
	tag: CategoryProps
}> => {
	const data = await prisma.post.findFirstOrThrow({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			title: true,
			desc: true,
			thumbnail: true,
			tag: {
				select: {
					id: true,
					category_name: true,
				},
			},
			contents: {
				select: {
					briefLists: { select: { text: true, id: true } },
					commentList: { select: { text: true, id: true } },
					reiviews: { select: { text: true, id: true } },
					cupang_link: true,
					id: true,
					productImage: true,
					title: true,
				},
			},
		},
	})

	return {
		id: data.id,
		title: data.title,
		desc: data.desc,
		thumbnail: data.thumbnail,
		contents: data.contents,
		tag: data.tag,
	}
}

const Edit = async ({ params }: { params: { id: string } }) => {
	const data = await getPosts(params.id)
	const category = await getCategory()
	return <EditPost data={data} categories={category} />
}
export default Edit
