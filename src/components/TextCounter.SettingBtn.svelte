<script lang='ts'>
	type Props = {
		text?: string
		active: boolean
		onClick: () => void
		class?: string
	}

	const { text = 'A', active, onClick, class: className = '' }: Props = $props()
</script>

<button
	class={`${className}`}
	class:underline={active}
	onclick={onClick}
>
	{text}
</button>
