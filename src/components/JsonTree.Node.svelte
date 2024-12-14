<script lang='ts'>
	import type { Snippet } from 'svelte'
	import { type ValueNode } from '@humanwhocodes/momoa'
	import Array from './JsonTree.Array.svelte'
	import Object from './JsonTree.Object.svelte'

	type Props = {
		name?: Snippet
		node: ValueNode
	}

	let { node, name }: Props = $props()
</script>

{#if node.type === 'Array'}
	<Array node={node} name={name} />
{:else if node.type === 'Object'}
	<Object node={node} name={name} />
{:else if node.type === 'String'}
	{#if name}
		{@render name()}
	{/if}
	<span class='text-success'>"{node.value}"</span>,
{:else if node.type === 'Number'}
	{#if name}
		{@render name()}
	{/if}
	<span class='text-warning'>{node.value}</span>,
{:else if node.type === 'Boolean'}
	{#if name}
		{@render name()}
	{/if}
	<span class='text-info'>{node.value}</span>,
{:else}
	<span class='border rounded text-sm'>node not implemented {node.type}</span>
{/if}
