const API_KEY = process.env.VITE_API_URL;

export const fetchInJSON = async (request: string, init?: RequestInit | undefined, onResponse?: (data: {}) => void, onError?: (data: unknown) => void) => {
	try {
		const response = await fetch(`${API_KEY}${request}`, init);

		if (response.ok) {
			const responseData = await response.json();
			if (onResponse)
				await onResponse(responseData)
			return responseData
		}
	} catch (error) {
		console.error(request, error)
		if (onError)
			await onError(error)
		return error
	}
}