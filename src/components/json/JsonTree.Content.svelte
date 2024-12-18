<script lang='ts'>

	type Props = {
		content: string
	}

	let { content }: Props = $props()

</script>

{#if content !== ''}
	<span class='rounded border border-opacity-30 border-primary text-xs mx-1 px-0.5'>{content}</span>
{/if}
