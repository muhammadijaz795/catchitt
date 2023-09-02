// export const getCache = () => {
// 	const data = sessionStorage.getItem("cache")
// 	if (data) {
// 		return new Set(JSON.parse(data))
// 	}
// 	return new Set()
// }

// export const replaceCache = (data: any[]) => {
// 	try {
// 		let current = new Set(data)
// 		sessionStorage.setItem("cache", JSON.stringify(Array.from(current)))
// 	} catch (error) {
// 		sessionStorage.setItem("cache", JSON.stringify([]))
// 	}
// }