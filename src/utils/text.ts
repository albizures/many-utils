export function getWhitespaceCount(text: string): number {
	return text.split(/\s+/).length - 1
}

export function getParagraphs(text: string): Array<string> {
	return text.split(/\n/).filter((line) => line.length > 0)
}

export function getSentenceCount(lines: Array<string>): number {
	let counter = 0

	for (let line of lines) {
		const sentences = line.split(/[.!?]/)
		const lasLength = sentences.at(-1)?.trim().length ?? 0
		const inTheLine = lasLength > 0 ? sentences.length : sentences.length - 1

		if (inTheLine > 0) {
			counter += inTheLine
		}
		else {
			counter += 1
		}
	}

	return counter
}

export function getWords(text: string): Array<string> {
	const words = text.split(/\s+/)
	const results = []

	for (let word of words) {
		if (word.length > 0) {
			results.push(word.toLowerCase())
		}
	}

	return results
}

export function getKeywordsDensity(text: string) {
	const words = getWords(text)
	const count = new Map<string, number>()

	for (let word of words) {
		const countValue = count.get(word) ?? 0
		count.set(word, countValue + 1)
	}

	return [...count.entries()].sort((a, b) => b[1] - a[1])
}
