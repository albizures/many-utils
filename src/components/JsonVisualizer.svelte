<script lang='ts'>
	import { type DocumentNode, parse } from '@humanwhocodes/momoa'
	import { onMount } from 'svelte'
	import ExpandableUtil from './ExpandableUtil.svelte'
	import Icon from './Icon.svelte'
	import Editor from './JsonVisualizer.Editor.svelte'
	import Node from './JsonVisualizer.Node.svelte'
	import TabList from './TabList.svelte'
	import Tab from './TabList.Tab.svelte'

	let dragStatus = $state<'dragging' | 'not-dragging'>('not-dragging')
	let content = $state<string>(JSON.stringify([{
		hello: 'word',
		foo: {
			nested: true,
			nested2: 2,
			obj: [
				1,
				'3',
				{
					hello: 'world',
				},
				[1, 2, 3],
			],
		},
	}], null, 2))
	const ast = $derived<DocumentNode>(parse(content))

	function onDragOver(event: DragEvent) {
		event.preventDefault()

		dragStatus = 'dragging'
	}

	function onDragLeave(event: DragEvent) {
		event.preventDefault()

		dragStatus = 'not-dragging'
	}

	function onDrop(event: DragEvent) {
		event.preventDefault()

		for (const file of event.dataTransfer?.files || []) {
			const reader = new FileReader()

			reader.onload = (e) => {
				const result = e.target?.result as string

				if (typeof result === 'string') {
					content = result
				}
			}
			file.type === 'application/json'
				&& reader.readAsText(file)
		}

		dragStatus = 'not-dragging'
	}

	onMount(() => {
		window.addEventListener('dragover', onDragOver)
		window.addEventListener('dragleave', onDragLeave)
		window.addEventListener('drop', onDrop)

		return () => {
			window.removeEventListener('dragover', onDragOver)
			window.removeEventListener('dragleave', onDragLeave)
			window.removeEventListener('drop', onDrop)
		}
	})

</script>

<ExpandableUtil class='px-6' expandedClass='pt-6'>
	{#if dragStatus === 'dragging'}
		<div class='fixed top-0 left-0 w-full h-full bg-base-100 bg-opacity-60 z-50 flex items-center justify-center'>
			<div class='bg-base-200 border-4 border-dashed border-primary animate-pulse p-8 rounded-box'>
				<div class='flex justify-center'>
					<Icon icon='file' class='text-4xl' />
				</div>
				<p>Drop here</p>
			</div>
		</div>
	{/if}

	<TabList asExpandableUtil={true} name='json-visualizer-tab'>
		<Tab title='Editor' index={0}>
			<Editor bind:content={content} />
		</Tab>
		<Tab title='Tree' index={1}>
			<div class='ml-5'>
				<Node node={ast.body}>
					{#snippet name()}
						<span></span>
					{/snippet}
				</Node>
			</div>
		</Tab>
	</TabList>
</ExpandableUtil>
