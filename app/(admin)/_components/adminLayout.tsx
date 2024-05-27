export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-1 w-full flex-col sm:flex-row  p-3">
			<div className="flex flex-col w-full flex-grow-0 flex-shrink-0">
				{children}
			</div>
		</div>
	)
}
