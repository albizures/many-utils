<script lang='ts'>
	import { type DocumentNode } from '@humanwhocodes/momoa'
	import JsonDiagram from './JsonDiagram.svelte'
	import PaneHeader from './PaneHeader.svelte'

	type Props = {
		ast: DocumentNode
	}

	let { ast }: Props = $props()

</script>

<div class='flex flex-col h-full'>
	<PaneHeader title='Diagram' icon='diagram' />

	<JsonDiagram ast={ast} />
</div>
