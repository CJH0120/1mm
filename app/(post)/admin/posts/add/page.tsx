import PostAdd from "./_components/addPost"
import { prisma } from "@/db/prisma"
export const dynamic = "force-dynamic"

export interface CategoryProps {
	id: number
	category_name: string
}
export const getCategory = async (): Promise<CategoryProps[] | null> => {
	try {
		return await prisma.tag.findMany({
			select: { category_name: true, id: true },
		})
	} catch (error) {
		return null
	} finally {
		await prisma.$disconnect()
	}
}

const Page = async () => {
	const categories = await getCategory()
	return <PostAdd categories={categories ?? []} />
}
export default Page
