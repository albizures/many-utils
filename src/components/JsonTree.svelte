<script lang='ts'>
	import type { DocumentNode } from '@humanwhocodes/momoa'
	import Node from './JsonTree.Node.svelte'

	type Props = {
		rootLabel: string
		ast: DocumentNode
	}

	const { rootLabel = '', ast }: Props = $props()
</script>

<Node node={ast.body}>
	{#snippet name()}
		<span>{rootLabel}</span>
	{/snippet}
</Node>
