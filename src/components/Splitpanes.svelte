<script lang='ts'>
	import type { Snippet } from 'svelte'
	import { type AddPaneArgs, type Orientation, setSplitpanesContext, type SplitPaneContextValue } from './Splitpanes.Context'

	type Props = {
		children: Snippet
		orientation?: Orientation
	}

	let { children, orientation = 'horizontal' }: Props = $props()
	let onResizes = new Map<number, (change: number) => void>()
	let sizes = new Map<number, () => number>()

	const context: SplitPaneContextValue = $state({
		elements: [],
		orientation,
		addPane(args: AddPaneArgs) {
			const { container, onResize, size } = args
			const index = context.elements.indexOf(container)
			if (index !== -1) {
				sizes.set(index, size)
				onResizes.set(index, onResize)
				return index
			}

			const newIndex = context.elements.length
			sizes.set(newIndex, size)
			onResizes.set(newIndex, onResize)
			context.elements.push(container)

			return newIndex
		},
		removePane(container: HTMLDivElement) {
			const index = context.elements.indexOf(container)
			if (index !== -1) {
				context.elements.splice(index, 1)
			}
		},

		resize(prev, next, change) {
			const prevOnResize = onResizes.get(prev)
			const nextOnResize = onResizes.get(next)

			const prevSize = sizes.get(prev)?.() ?? 0
			const nextSize = sizes.get(next)?.() ?? 0

			if (prevSize + change < 0 && prev !== 0) {
				context.resize(prev - 1, next, change)
				return
			}

			if (nextSize - change < 0 && next !== context.elements.length - 1) {
				context.resize(prev, next + 1, change)
				return
			}

			if (prevOnResize) {
				prevOnResize(change)
			}

			if (nextOnResize) {
				nextOnResize(-change)
			}
		},
	})

	setSplitpanesContext(() => context)

</script>
<div class='flex min-h-64'>
	{@render children()}
</div>
