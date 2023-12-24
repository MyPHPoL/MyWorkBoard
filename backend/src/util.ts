import { z } from "zod"

export function formatApiError(err: string) {
	return {
		status: err
	}
}
export function formatZodError<T>(error: z.ZodError<T>) {
	return error.issues.map(x => x.message).join(' ')
}