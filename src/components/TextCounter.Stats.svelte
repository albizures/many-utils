<script lang='ts'>
	import { getParagraphs, getSentenceCount, getWhitespaceCount, getWords } from '../utils/text'
	import Value from './TextCounter.Value.svelte'

	type Props = {
		text: string
	}

	let { text }: Props = $props()

	const wordCount = $derived(getWords(text).length)
	const whitespaceCount = $derived(getWhitespaceCount(text))
	const lines = $derived(getParagraphs(text))
	const sentenceCount = $derived(getSentenceCount(lines))

</script>

<Value label='Words' value={wordCount} testId='stat-value-words' />
<Value label='Characters' value={text.length} testId='stat-value-characters' />
<Value label='Whitespaces' value={whitespaceCount} testId='stat-value-whitespaces' />
<Value label='Paragraphs' value={lines.length} testId='stat-value-paragraphs' />
<Value label='Sentences' value={sentenceCount} testId='stat-value-sentences' />
