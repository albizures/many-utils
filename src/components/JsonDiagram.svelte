<script lang='ts'>
	import dagre from '@dagrejs/dagre'
	import {
		type DocumentNode,
		iterator,
		type ArrayNode as JsonArrayNode,
		type Node as JsonNode,
		type MemberNode,
		type ObjectNode } from '@humanwhocodes/momoa'
	import {
		Background,
		BackgroundVariant,
		Controls,
		type Edge,
		MiniMap,
		type Node,
		Position,
		SvelteFlow,
	} from '@xyflow/svelte'
	import { writable } from 'svelte/store'
	import ArrayNode from './JsonDiagram.ArrayNode.svelte'
	import '@xyflow/svelte/dist/base.css'

	function getMemberName(node: MemberNode) {
		if (node.name.type === 'Identifier') {
			return node.name.name
		}

		return node.name.value
	}

	type Props = {
		ast: DocumentNode
	}

	let { ast }: Props = $props()

	const ids = new Map<JsonNode, string>()
	const jsonNodes: Array<Node> = []
	const jsonEdges: Array<Edge> = []
	const initialPosition = { x: 0, y: 0 }
	for (const { node, parent } of iterator(ast, ({ phase }) => phase === 'enter')) {
		// console.log(node.type)
		// console.log(parent)

		if (node.type === 'Document') {
			const id = 'root'
			ids.set(node, id)
			jsonNodes.push({
				id,
				type: 'input',
				data: { label: 'root' },
				position: initialPosition,
			})
		}
		else if (parent) {
			const parentId = ids.get(parent)!
			let id = `${parentId}.${node.type}`

			if (parent.type === 'Array') {
				const index = (parent as JsonArrayNode).elements.findIndex((element) => element === node)
				id = `${parentId}[${index}]`
			}
			else if (parent.type === 'Object') {
				const objNode = parent as ObjectNode
				const member: MemberNode = objNode.members.find((member) => member === node)!
				const memberName = getMemberName(member)
				id = `${parentId}.${memberName}`
			}
			else if (parent.type === 'Member') {
				id = `${parentId}=${node.type}`
			}

			ids.set(node, id)
			jsonNodes.push({
				id,
				data: { label: node.type, data: '111' },
				position: initialPosition,
				type: node.type === 'Array' ? 'array' : 'default',
			})

			jsonEdges.push({
				id: `e${parentId}.${node.type}`,
				source: parentId,
				target: id,
				type: 'smoothstep',
			})
		}
	}

	const dagreGraph = new dagre.graphlib.Graph()
	dagreGraph.setDefaultEdgeLabel(() => ({}))

	const nodeWidth = 172
	const nodeHeight = 36

	function getLayoutedElements(nodes: Array<Node>, edges: Array<Edge>) {
		dagreGraph.setGraph({ rankdir: 'LR' })

		nodes.forEach((node) => {
			dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
		})

		edges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target)
		})

		dagre.layout(dagreGraph)

		nodes.forEach((node) => {
			const nodeWithPosition = dagreGraph.node(node.id)
			node.targetPosition = Position.Left
			node.sourcePosition = Position.Right

			// We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			}
		})

		return { nodes, edges }
	}

	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
		jsonNodes,
		jsonEdges,
	// [
		// 	{
		// 		id: '1',
		// 		type: 'input',
		// 		data: { label: 'input' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '2',
		// 		data: { label: 'node 2' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '2a',
		// 		data: { label: 'node 2a' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '2b',
		// 		data: { label: 'node 2b' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '2c',
		// 		data: { label: 'node 2c' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '2d',
		// 		data: { label: 'node 2d' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '3',
		// 		data: { label: 'node 3' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '4',
		// 		data: { label: 'node 4' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '5',
		// 		data: { label: 'node 5' },
		// 		position: initialPosition,
		// 	},
		// 	{
		// 		id: '6',
		// 		type: 'output',
		// 		data: { label: 'output' },
		// 		position: initialPosition,
		// 	},
		// 	{ id: '7', type: 'output', data: { label: 'output' }, position: initialPosition },
		// ],
		// [
		// 	{ id: 'e12', source: '1', target: '2', type: edgeType },
		// 	{ id: 'e13', source: '1', target: '3', type: edgeType },
		// 	{ id: 'e22a', source: '2', target: '2a', type: edgeType },
		// 	{ id: 'e22b', source: '2', target: '2b', type: edgeType },
		// 	{ id: 'e22c', source: '2', target: '2c', type: edgeType },
		// 	{ id: 'e2c2d', source: '2c', target: '2d', type: edgeType },
		// 	{ id: 'e45', source: '4', target: '5', type: edgeType },
		// 	{ id: 'e56', source: '5', target: '6', type: edgeType },
		// 	{ id: 'e57', source: '5', target: '7', type: edgeType },
		// ],
	)

	const nodes = writable(layoutedNodes)
	const edges = writable(layoutedEdges)

	const nodeTypes = {
		array: ArrayNode,
	}

	const snapGrid: [number, number] = [25, 25]
</script>

<div class='h-full flex-1'>
	<SvelteFlow
		{nodes}
		{edges}
		{snapGrid}
		{nodeTypes}
		fitView
		proOptions={{ hideAttribution: true }}
		nodesDraggable={false}
		nodesConnectable={false}
		on:nodeclick={(event) => console.log('on node click', event.detail.node)}
	>
		<Controls />
		<Background variant={BackgroundVariant.Lines} />
		<MiniMap />
	</SvelteFlow>
</div>

<style>
	:global {
		.svelte-flow__background {
			@apply bg-base-100;
		}
		.svelte-flow__background-pattern.lines {
			@apply stroke-base-200;
		}

		.svelte-flow__node {
			@apply bg-base-300 text-base-content rounded px-2;
		}

		.svelte-flow__handle {
			@apply opacity-0;
		}

		.svelte-flow__minimap {
			@apply border border-base-200 bg-base-100;
		}
		.svelte-flow__minimap-mask {
			@apply fill-base-300;
		}
		.svelte-flow__minimap-node {
			@apply fill-transparent !stroke-base-content;
		}
	}
</style>
