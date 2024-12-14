<script lang='ts'>
	import clsx from 'clsx'
	import Icon from './Icon.svelte'

	type Props = {
		status: 'open' | 'close'
	}

	let { status }: Props = $props()

</script>

<Icon icon='caret' class={clsx('mt-1 mr-1', {
	'-rotate-90': status === 'close',
})} />
