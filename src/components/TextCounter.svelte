<script lang='ts'>
	import { getLines, getSentenceCount, getWhitespaceCount, getWordCount } from '../utils/text'
	import Icon from './Icon.svelte'
	import SettingBtn from './TextCounter.SettingBtn.svelte'

	let status = $state<'expanded' | 'collapsed'>('collapsed')
	let text = $state('')
	let textarea: HTMLTextAreaElement
	let fontSize = $state<'sm' | 'lg' | '2xl'>('lg')
	let fontType = $state<'sans' | 'serif'>('sans')

	$effect(() => {
		// eslint-disable-next-line no-unused-expressions
		text // to trigger the reactivity
		textarea.style.width = '100%'
		textarea.style.height = `${textarea.scrollHeight}px`
	})

	const wordCount = $derived(getWordCount(text))
	const whitespaceCount = $derived(getWhitespaceCount(text))
	const lines = $derived(getLines(text))
	const sentenceCount = $derived(getSentenceCount(lines))

	function onExpand() {
		status = status === 'collapsed' ? 'expanded' : 'collapsed'
	}

</script>
<div
	class='top-0 left-0 w-full h-full bg-base-100 z-50'
	class:fixed={status === 'expanded'}
	class:p-6={status === 'expanded'}
>
	<div class='flex justify-between'>
		<span>
			<!-- just space -->
		</span>
		<h1 class='text-2xl sm:text-3xl text-center justify-self-center'>Text Counter</h1>
		<button onclick={onExpand}>
			<Icon class='text-xl' icon='expand' />
		</button>
	</div>

	<div class='mt-8 flex items-baseline space-x-4 justify-center'>
		<div class='flex items-baseline space-x-2'>
			{@render label('Font Size')}
			<div class='flex space-x-1 items-baseline'>
				<SettingBtn active={fontSize === 'sm'} class='text-sm' onClick={() => fontSize = 'sm'} />
				<SettingBtn active={fontSize === 'lg'} class='text-lg' onClick={() => fontSize = 'lg'} />
				<SettingBtn active={fontSize === '2xl'} class='text-2xl' onClick={() => fontSize = '2xl'} />
			</div>
		</div>
		<div class='divider divider-horizontal py-2'></div>
		<div class='flex space-x-2'>
			{@render label('Font Type')}
			<div class='flex space-x-2 items-baseline'>
				<SettingBtn active={fontType === 'sans'} class='text-lg font-sans' onClick={() => fontType = 'sans'} />
				<SettingBtn active={fontType === 'serif'} class='text-lg font-serif' onClick={() => fontType = 'serif'} />
			</div>
		</div>
	</div>
	<div class='mx-4 sticky border-base-content border-opacity-10 border-y-2 md:border-b-0 py-4 md:pb-0 mt-4 top-0 bg-base-100'>
		<div class='md:hidden grid grid-cols-2'>
			<p>{@render label('Words')} {@render value(wordCount)}</p>
			<p>{@render label('Characters')} {@render value(text.length)}</p>
			<p>{@render label('Whitespaces')} {@render value(whitespaceCount)}</p>
			<p>{@render label('Lines')} {@render value(lines.length)}</p>
			<p>{@render label('Sentences')} {@render value(sentenceCount)}</p>
		</div>
	</div>
	<div class='flex mt-4'>
		<div class='w-3/4'>
			<label class='form-control'>
				<div class='label sr-only'>
					<span class='label-text'>Your text</span>
				</div>
				<textarea
					bind:this={textarea}
					bind:value={text}
					class:text-sm={fontSize === 'sm'}
					class:text-lg={fontSize === 'lg'}
					class:text-2xl={fontSize === '2xl'}
					class:font-sans={fontType === 'sans'}
					class:font-serif={fontType === 'serif'}
					class='textarea border-0 overflow-hidden resize-none appearance-none textarea-bordered h-14 focus:outline-none'
					placeholder='Start writing here...'
				>
				</textarea>
			</label>

		</div>
		<div class='pt-4 divider divider-horizontal hidden md:flex'></div>
		<div class='my-4 space-y-2 sticky top-0 pt-4 hidden md:block'>
			<p>{@render label('Words')} {@render value(wordCount)}</p>
			<p>{@render label('Characters')} {@render value(text.length)}</p>
			<p>{@render label('Whitespaces')} {@render value(whitespaceCount)}</p>
			<p>{@render label('Lines')} {@render value(lines.length)}</p>
			<p>{@render label('Sentences')} {@render value(sentenceCount)}</p>
		</div>
	</div>

</div>

{#snippet label(value: string)}
	<span class='opacity-50'>
		{value}:
	</span>
{/snippet}

{#snippet value(value: string | number)}
	<span class=' font-bold '>
		{value}
	</span>
{/snippet}
