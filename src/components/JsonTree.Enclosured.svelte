<script lang='ts'>
	import type { Snippet } from 'svelte'
	import CaretTree from './CaretTree.svelte'
	import Content from './JsonTree.Content.svelte'

	type Props = {
		name?: Snippet
		children: Snippet
		start: string
		end: string
		amount: number
		amountLabels: {
			singular: string
			plural: string
		}
	}

	let { name, amount, amountLabels, start, end, children }: Props = $props()

	let status = $state<'open' | 'close'>('open')

	function toggle() {
		status = status === 'open' ? 'close' : 'open'
	}

	const content = `${amount} ${amount === 1 ? amountLabels.singular : amountLabels.plural}`

</script>

<button onclick={toggle} class='flex items-baseline -ml-5'>
	<CaretTree status={status} />
	<span>
		{#if name}
			{@render name()}
		{/if}
		{start}
	</span>
	{#if status === 'close'}
		<Content content={content} />
		{end}
	{/if}
</button>

{#if status === 'open'}
	{@render children()}
{/if}
<div>
	{#if status === 'open'}
		{end},
	{/if}
</div>
