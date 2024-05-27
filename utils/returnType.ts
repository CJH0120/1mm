export interface PrismaSuccessResponse<DataType = any[]> {
	status: "success"
	data?: DataType
}

export interface PrismaErrorResponse {
	status: "error"
	errorMessage: string
}

export type PrismaResponse<DataType = any[]> =
	| PrismaSuccessResponse<DataType>
	| PrismaErrorResponse
