import PostAdd from "./_components/addPost"
import { prisma } from "@/db/prisma"

export interface CategoryProps {
	id: number
	category_name: string
}
const getCategory = async (): Promise<CategoryProps[]> => {
	return await prisma.tag.findMany({
		select: { category_name: true, id: true },
	})
}

const Page = async () => {
	const categories = await getCategory()
	return <PostAdd categories={categories} />
}
export default Page
