<script lang='ts'>
	import type { Snippet } from 'svelte'
	import { getTabListContext } from './TabList.Context'

	type Props = {
		index: number
		title: string
		children: Snippet
	}

	let { index, title, children }: Props = $props()

	let context = getTabListContext()

</script>

<input
	type='radio'
	name={context.name}
	role='tab'
	class='tab'
	value={index}
	bind:group={context.tab}
	aria-label={title}
/>
<div role='tabpanel' class='tab-content bg-base-100 border-base-300 rounded-box'>
	{#if context.tab === index}
		{@render children()}
	{/if}
</div>
