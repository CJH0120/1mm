export namespace API {
	export interface BlogCardProps {
		cardId: number
		cardTitle: string
		cardDesc: string
		cardThumbnail: string
		regDate: string
	}
	export interface RecommendCardProps {
		card: BlogCardProps
		content: contentProps[]
	}
}

export interface contentProps {
	cupang_link: string
	productImage: string
	title: string
	commentList: commentListProps[]
	brief: BriefListProps[]
}

export interface commentListProps {
	comment: string
}
export interface BriefListProps {
	brief: string
}
