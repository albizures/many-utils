<script lang='ts'>
	import { indentWithTab } from '@codemirror/commands'
	import { json } from '@codemirror/lang-json'
	import { EditorView, keymap } from '@codemirror/view'
	import { basicSetup } from 'codemirror'
	import { onMount } from 'svelte'
	import { dracula } from 'thememirror'

	type Props = {
		content: string
	}

	let { content = $bindable() }: Props = $props()

	onMount(() => {
		const editor = new EditorView({
			doc: content,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				json(),
				dracula,
			],
			parent: document.querySelector('#editor')!,
		})

		$effect(() => {
			editor.dispatch(
				editor.state.update({ changes: { from: 0, to: editor.state.doc.length, insert: content } }),
			)
		})
		return () => {
			content = editor.state.doc.toString()
			editor.destroy()
		}
	})
</script>

<div id='editor'></div>
