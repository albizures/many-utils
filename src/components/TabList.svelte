<script lang='ts'>
	import type { Snippet } from 'svelte'
	import ExpandableUtilToggle from './ExpandableUtil.Toggle.svelte'
	import { setTabListContext } from './TabList.Context'

	type Props = {
		name: string
		children: Snippet
		asExpandableUtil?: boolean
	}

	let { name, children, asExpandableUtil = false }: Props = $props()

	const context = $state({ tab: 0, name })

	setTabListContext(context)

</script>

<div role='tablist' class='tabs tabs-lifted relative'>
	{#if asExpandableUtil}
		<div class='absolute right-0 top-0'><ExpandableUtilToggle /></div>
	{/if}
	{@render children()}
</div>
