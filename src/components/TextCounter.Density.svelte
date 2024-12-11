<script lang='ts'>
	import { getKeywordsDensity, getWords } from '../utils/text'
	import Icon from './Icon.svelte'
	import Value from './TextCounter.Value.svelte'

	type Props = {
		text: string
	}

	const maxKeywords = 5

	let { text }: Props = $props()
	const density = $derived(getKeywordsDensity(text))
	const wordCount = $derived(getWords(text).length)
	let status = $state<'expanded' | 'collapsed'>('collapsed')
	const displayedWords = $derived(status === 'expanded' ? density : density.slice(0, maxKeywords))

	function toggle() {
		if (status === 'collapsed') {
			status = 'expanded'
		}
		else {
			status = 'collapsed'
		}
	}
</script>

<div data-testid='density'>
	<div>
		{#each displayedWords as [keyword, count], index}
			<Value label={keyword} value={`${count} (${Number.parseInt(`${(count / wordCount) * 100}`, 10)}%)`} testId={`keyword-${index}`} />
		{/each}
	</div>

	{#if displayedWords.length === 0}
		<p class='text-center mt-1 text-sm opacity-50'>No keywords</p>
	{:else if density.length > maxKeywords}
		<div class='flex justify-center'>
			<button class='btn btn-xs btn-ghost mt-2 ' onclick={toggle}>
				{status === 'collapsed' ? 'Show more' : 'Show less'}
				<Icon class={status === 'expanded' ? 'rotate-180' : undefined} icon='caret' />
			</button>
		</div>
	{/if}
</div>
