<script lang='ts'>
	import { getLines, getSentenceCount, getWhitespaceCount, getWordCount } from '../utils/text'

	type Props = {
		text: string
	}

	let { text }: Props = $props()

	const wordCount = $derived(getWordCount(text))
	const whitespaceCount = $derived(getWhitespaceCount(text))
	const lines = $derived(getLines(text))
	const sentenceCount = $derived(getSentenceCount(lines))

</script>

<p>{@render label('Words')} {@render value(wordCount)}</p>
<p>{@render label('Characters')} {@render value(text.length)}</p>
<p>{@render label('Whitespaces')} {@render value(whitespaceCount)}</p>
<p>{@render label('Lines')} {@render value(lines.length)}</p>
<p>{@render label('Sentences')} {@render value(sentenceCount)}</p>

{#snippet label(value: string)}
	<span class='opacity-50'>
		{value}:
	</span>
{/snippet}

{#snippet value(value: string | number)}
	<span class=' font-bold '>
		{value}
	</span>
{/snippet}
