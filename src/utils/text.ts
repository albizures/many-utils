export function getWordCount(text: string): number {
	return text.split(/\s+/).filter((word) => word.length > 0).length
}

export function getWhitespaceCount(text: string): number {
	return text.split(/\s+/).length - 1
}

export function getLines(text: string): Array<string> {
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
