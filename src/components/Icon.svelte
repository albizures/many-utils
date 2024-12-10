<script lang='ts'>
	import { type IconName, icons } from '../icon'

	type Props = {
		icon: IconName
		class?: string
	}

	const { icon, class: className = '' }: Props = $props()

	const iconName = icons[icon]

</script>

<span class={`${iconName} ${className}`}></span>
