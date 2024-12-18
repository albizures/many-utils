<script lang='ts'>
	import { indentWithTab } from '@codemirror/commands'
	import { json } from '@codemirror/lang-json'
	import { Compartment } from '@codemirror/state'
	import { EditorView, keymap } from '@codemirror/view'
	import { basicSetup } from 'codemirror'
	import debounce from 'debounce'
	import { onMount } from 'svelte'
	import { dracula, espresso } from 'thememirror'

	type Props = {
		id: string
		content: string
	}

	let { content = $bindable(), id }: Props = $props()

	let lastState = content
	const syncContent = debounce((editor: EditorView) => {
		content = editor.state.doc.toString()
		lastState = content
	}, 500)

	onMount(() => {
		const themeConfig = new Compartment()
		const savedTheme = localStorage.getItem('v:theme')
		const isDark = savedTheme !== null ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
		const theme = isDark ? dracula : espresso

		const editor = new EditorView({
			doc: content,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				json(),
				themeConfig.of(theme),
				dracula,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						syncContent(editor)
					}
				}),
			],
			parent: document.querySelector(`#${id}`)!,
		})

		function onThemeChange(event: Event) {
			const theme = (event as CustomEvent).detail === 'dark' ? dracula : espresso

			editor.dispatch({
				effects: themeConfig.reconfigure([theme]),
			})
		}

		document.addEventListener('theme-change', onThemeChange)

		$effect(() => {
			if (content === lastState) {
				return
			}

			editor.dispatch(
				editor.state.update({ changes: { from: 0, to: editor.state.doc.length, insert: content } }),
			)
		})
		return () => {
			syncContent(editor)
			editor.destroy()
			document.removeEventListener('theme-change', onThemeChange)
		}
	})
</script>

<div id={id}></div>

<style>
	:global {
		.ͼ3k {
			@apply !bg-base-100;
		}
	}
</style>
