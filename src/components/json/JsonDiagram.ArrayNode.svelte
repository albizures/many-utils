<script lang='ts'>
	import type { ArrayNode } from '@humanwhocodes/momoa'
	import { Handle, Position, useNodesData } from '@xyflow/svelte'

	type Props = {
		isConnectable: boolean
		id: string
	}

	let { isConnectable }: Props = $props()

</script>

<Handle type='target' position={Position.Left} style='background: #555;' {isConnectable} />
<div>

</div>
<Handle
	type='source'
	position={Position.Right}
	id='a'
	style='top: 10px; background: #555;'
	{isConnectable}
/>
<Handle
	type='source'
	position={Position.Right}
	id='b'
	style='bottom: 10px; top: auto; background: #555;'
	{isConnectable}
/>

<style>
  :global(.svelte-flow__node-selectorNode) {
    font-size: 12px;
    background: #eee;
    border: 1px solid #555;
    border-radius: 5px;
    text-align: center;
  }
</style>
