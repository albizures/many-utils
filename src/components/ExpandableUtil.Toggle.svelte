<script lang='ts'>
	import { getExpandableUtilContext } from './ExpandableUtil.Context'
	import Icon from './Icon.svelte'

	type Props = {
		size?: 'sm' | 'md' | 'lg'
	}

	const { size = 'md' }: Props = $props()

	const context = getExpandableUtilContext()

	const sizeClasses = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
	}

	const sizeClass = $derived(sizeClasses[size])

</script>

<button onclick={context.toggle}>
	<span class='sr-only'>{context.status === 'expanded' ? 'collapse' : 'expand'}</span>
	{#if context.status === 'expanded'}
		<Icon class={sizeClass} icon='compress' />
	{:else}
		<Icon class={sizeClass} icon='expand' />
	{/if}
</button>
