<script lang='ts'>
	import { onMount, type Snippet } from 'svelte'
	import { getSplitpanesContext, type PaneContextValue, setPaneContext } from './Splitpanes.Context'
	import Divider from './Splitpanes.Divider.svelte'

	type Props = {
		children: Snippet
	}

	let { children }: Props = $props()
	let index = $state<number>(-1)
	let container: HTMLDivElement
	let context = $derived(getSplitpanesContext())
	let size = $state<number>(0)

	onMount(() => {
		index = context.addPane({
			container,
			onResize(change) {
				size += change
				if (size < 1) {
					size = 0
				}
			},

			size: () => size,
		})

		setTimeout(() => {
			const rect = container.getBoundingClientRect()
			size = rect.width
			container.classList.remove('flex-1')
		}, 0)

		return () => {
			context.removePane(container)
		}
	})

	const paneContext: PaneContextValue = $derived({
		index,
		size,
	})
	setPaneContext(() => paneContext)

	const isLastChild = $derived(index === context.elements.length - 1)

	let widthPx = $derived(`${size}px`)
</script>

<div style:width={widthPx} bind:this={container} class='flex-1'>
	{@render children()}
</div>

{#if !isLastChild && index !== -1}
	<Divider prev={index} next={index + 1} />
{/if}
