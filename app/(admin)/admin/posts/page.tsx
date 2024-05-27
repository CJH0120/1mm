import { Button } from "@/components/ui/button"
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
import Link from "next/link"
import { AdminLayout } from "../../_components/adminLayout"

const TagPage = () => {
	return (
		<AdminLayout>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">게시글 번호</TableHead>
						<TableHead>카테고리 이름</TableHead>
						<TableHead>게시글 제목</TableHead>
						<TableHead className="text-right">
							<Link href={"/admin/posts/add"}>
								<Button
									size={"sm"}
									className="bg-primary text-primary-foreground"
								>
									추가하기 <PlusIcon className="ml-2" />
								</Button>
							</Link>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">INV001</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell>Credit Card</TableCell>
						<TableCell className="text-right">
							{/* <Button size={'sm'}></Button> */}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</AdminLayout>
	)
}

export default TagPage
