<script lang='ts'>
	import clsx from 'clsx'
	import { type Snippet } from 'svelte'
	import { type ExpandableUtilContextValue, setExpandableUtilContext } from './ExpandableUtil.Context'

	type Props = {
		children: Snippet
		expandedClass?: string
		class?: string
	}
	let { children, class: className = '', expandedClass = '' }: Props = $props()

	const context = $state<ExpandableUtilContextValue>({ status: 'collapsed', toggle })

	function toggle() {
		context.status = context.status === 'expanded' ? 'collapsed' : 'expanded'
	}

	setExpandableUtilContext(context)
</script>

<div
	data-testid='expandable-util'
	class={clsx(`top-0 left-0 w-full h-full bg-base-100 z-50`, className, {
		[expandedClass]: context.status === 'expanded',
		fixed: context.status === 'expanded',
	})}
>
	{@render children()}
</div>
