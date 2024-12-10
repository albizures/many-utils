<script lang='ts'>
	import { getKeywordsDensity } from '../utils/text'

	type Props = {
		text: string
	}

	let { text }: Props = $props()
	const density = $derived(getKeywordsDensity(text))
</script>

<div>
	{#each density as [keyword, count]}
		<p>
			{keyword}: {count}
		</p>
	{/each}
</div>
