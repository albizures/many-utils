<script lang='ts'>
	import { onMount } from 'svelte'
	import { getSplitpanesContext } from './Splitpanes.Context'

	type Props = {
		prev: number
		next: number
	}

	let { prev, next }: Props = $props()
	let context = $derived(getSplitpanesContext())

	function onMouseDown() {
		window.addEventListener('mousemove', onMouseMove)
		window.addEventListener('mouseup', onMouseUp)
	}

	function onMouseMove(event: MouseEvent) {
		context.resize(prev, next, event.movementX)
	}

	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove)
		window.removeEventListener('mouseup', onMouseUp)
	}

	onMount(() => {
		return () => {
			window.removeEventListener('mousemove', onMouseMove)
			window.removeEventListener('mouseup', onMouseUp)
		}
	})

</script>

<button onmousedown={onMouseDown} class='bg-primary cursor-col-resize w-4'>
	<span class='sr-only'>divider</span>
	<div class='h-full w-full bg-gray-300'></div>
</button>
