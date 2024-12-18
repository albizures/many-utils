<script lang='ts'>

	import CodeEditor from './CodeEditor.svelte'
	import PaneHeader from './PaneHeader.svelte'
	import { getPaneContext } from './Splitpanes.Context'

	type Props = {
		content: string
	}

	let { content = $bindable() }: Props = $props()

	const paneContext = $derived(getPaneContext())
	const size = $derived(paneContext.size)
</script>

<PaneHeader title='Editor' icon='code' />

{#if size >= 1}
	<CodeEditor id='json-editor' bind:content={content} />
{/if}
