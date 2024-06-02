import { Button } from "@/components/ui/button"
import { prisma } from "@/db/prisma"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { PlusIcon } from "@radix-ui/react-icons"
import { AdminLayout } from "../../_components/adminLayout"
import AddModal from "../../_components/addModal"

const getCategories = async () => {
	try {
		return await prisma.tag.findMany()
	} catch (error) {
		return null
	} finally {
		await prisma.$disconnect()
	}
}

const TagPage = async () => {
	const tags = await getCategories()
	return (
		<AdminLayout>
			<Table>
				<TableCaption>
					<AddModal />
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">이름</TableHead>
						<TableHead>글 갯수</TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tags?.map((v) => (
						<TableRow key={v.id}>
							<TableCell className="font-medium">{v.category_name}</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell className="text-right">
								<Button size={"sm"}>수정</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</AdminLayout>
	)
}

export default TagPage
