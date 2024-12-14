<script lang='ts'>
	import { type IdentifierNode, type StringNode } from '@humanwhocodes/momoa'

	type Props = {
		name: StringNode | IdentifierNode
	}
	let { name }: Props = $props()

</script>

{#if name.type === 'String'}
	{name.value}
{:else}
	{name.name}
{/if}:
