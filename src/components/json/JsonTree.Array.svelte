<script lang='ts'>
	import type { Snippet } from 'svelte'
	import { type ArrayNode } from '@humanwhocodes/momoa'
	import Enclosured from './JsonTree.Enclosured.svelte'
	import Node from './JsonTree.Node.svelte'

	type Props = {
		name?: Snippet
		node: ArrayNode
	}

	let { node, name }: Props = $props()
</script>

<Enclosured name={name} amount={node.elements.length} amountLabels={{ singular: 'item', plural: 'items' }} start='[' end=']'>
	{#snippet children()}
		<div class='flex flex-nowrap text-nowrap flex-col pl-6 border-l border-base-content border-opacity-25 border-dashed'>
			{#each node.elements as item, index}
				<div>
					<Node node={item.value}>
						{#snippet name()}
							<span>{index}:</span>
						{/snippet}
					</Node>
				</div>
			{/each}
		</div>
	{/snippet}
</Enclosured>
