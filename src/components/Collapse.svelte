<script lang='ts'>
	import type { Snippet } from 'svelte'

	type Props = {
		title: string
		children: Snippet
		class?: string
		initialState?: 'expanded' | 'collapsed'
	}

	let { title, children, class: className = '', initialState }: Props = $props()

</script>

<div data-testid='collapse' class={`collapse collapse-arrow ${className}`}>
	<input data-testid='collapse-toggle' checked={initialState === 'expanded'} type='checkbox' class='min-h-0' />
	<div data-testid='collapse-title' class='collapse-title min-h-0 font-medium py-1 text-center bg-base-200'>{title}</div>
	<div class='collapse-content mt-3'>
		{@render children()}
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 1rem;
	}
</style>
