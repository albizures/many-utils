<script lang='ts'>
	import type { Snippet } from 'svelte'
	import { type ObjectNode } from '@humanwhocodes/momoa'
	import Enclosured from './JsonTree.Enclosured.svelte'
	import Name from './JsonTree.Name.svelte'
	import Node from './JsonTree.Node.svelte'

	type Props = {
		name?: Snippet
		node: ObjectNode
	}

	let { node, name }: Props = $props()

</script>

<Enclosured name={name} amount={node.members.length} amountLabels={{ singular: 'key', plural: 'keys' }} start={'{'} end={'}'}>
	{#snippet children()}
		<div class='flex flex-nowrap flex-col pl-6 border-l border-base-content border-opacity-25 border-dashed'>
			{#each node.members as member}
				<div>
					<Node node={member.value}>
						{#snippet name()}
							<Name name={member.name} />
						{/snippet}
					</Node>
				</div>
			{/each}
		</div>
	{/snippet}
</Enclosured>
