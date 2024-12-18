<script lang='ts'>
	import { type DocumentNode } from '@humanwhocodes/momoa'
	import Node from './JsonTree.Node.svelte'
	import PaneHeader from './PaneHeader.svelte'
	import { getPaneContext } from './Splitpanes.Context'

	type Props = {
		ast: DocumentNode
	}

	let { ast }: Props = $props()

	const paneContext = $derived(getPaneContext())
	const size = $derived(paneContext.size)

</script>

<PaneHeader title='Tree' icon='tree' />

{#if size >= 1}
	<div class='ml-5 overflow-scroll'>
		<Node node={ast.body}>
			{#snippet name()}
				<span></span>
			{/snippet}
		</Node>
	</div>
{/if}
