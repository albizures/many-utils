<script lang='ts'>
	import { onMount } from 'svelte'
	import Icon from './Icon.svelte'

	type Props = {
		content: string
	}

	let { content = $bindable() }: Props = $props()
	let dragStatus = $state<'dragging' | 'not-dragging'>('not-dragging')

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
