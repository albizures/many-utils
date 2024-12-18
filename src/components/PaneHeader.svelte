<script lang='ts'>
	import type { IconName } from '../icon'
	import clsx from 'clsx'
	import Icon from './Icon.svelte'
	import { getPaneContext } from './Splitpanes.Context'

	type Props = {
		title: string
		icon: IconName
	}

	let { title, icon }: Props = $props()

	const paneContext = $derived(getPaneContext())
	const size = $derived(paneContext.size)

	let titleDirection = $state<'horizontal' | 'vertical'>('horizontal')

	$effect(() => {
		if (size >= 40) {
			titleDirection = 'horizontal'
		}
		else {
			titleDirection = 'vertical'
		}
	})

</script>

<div class={clsx('bg-base-300 text-base-content w-full', {
	'overflow-hidden': titleDirection === 'horizontal',
})}>
	<h5 class={clsx('text-base-content pointer-events-none origin-top-left transition-all text-nowrap flex items-center', {
		'rotate-90': titleDirection === 'vertical',
		'w-full text-xl': titleDirection === 'horizontal',
	})}>
		<Icon icon={icon} class='min-w-4 min-h-4 ml-2 mr-1' />
		{title}
	</h5>
</div>
