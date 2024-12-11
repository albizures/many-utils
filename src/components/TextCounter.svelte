<script lang='ts'>
	import Collapse from './Collapse.svelte'
	import Icon from './Icon.svelte'
	import Keywords from './TextCounter.Keywords.svelte'
	import SettingBtn from './TextCounter.SettingBtn.svelte'
	import Stats from './TextCounter.Stats.svelte'

	let status = $state<'expanded' | 'collapsed'>('collapsed')
	let text = $state('')
	let textarea: HTMLTextAreaElement
	let fontSize = $state<'sm' | 'lg' | '2xl'>('lg')
	let fontType = $state<'sans' | 'serif'>('sans')

	$effect(() => {
		// eslint-disable-next-line no-unused-expressions
		text // to trigger the reactivity

		const height = textarea.scrollHeight < 200 ? 200 : textarea.scrollHeight

		textarea.style.width = '100%'
		textarea.style.height = `${height}px`
	})

	function onExpand() {
		status = status === 'collapsed' ? 'expanded' : 'collapsed'
	}

</script>
<div
	data-testid='text-counter'
	class='top-0 left-0 w-full h-full bg-base-100 z-50 p-6'
	class:fixed={status === 'expanded'}
>
	<div class='flex justify-between'>
		<span>
			<!-- just space -->
		</span>
		<h1 class='text-2xl sm:text-3xl text-center justify-self-center'>Text Counter</h1>
		<button onclick={onExpand}>
			<span class='sr-only'>{status === 'expanded' ? 'collapse' : 'expand'}</span>
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
	<div class='mx-4 sticky md:pb-0 mt-4 top-0 bg-base-100'>
		<Collapse initialState='expanded' class='md:hidden' title='Stats'>
			<div class='grid grid-cols-3 gap-4'>
				<Stats text={text} />
			</div>
		</Collapse>
		<Collapse class='md:hidden' title='Keywords'>
			<Keywords text={text} />
		</Collapse>
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
		<div class='divider divider-horizontal hidden md:flex'></div>
		<div class='hidden md:block grow w-1/4'>
			<div class='sticky top-0 pt-4'>
				<Collapse initialState='expanded' title='Stats'>
					<div class='space-y-2'>
						<Stats text={text} />
					</div>
				</Collapse>
				<Collapse title='Keywords'>
					<Keywords text={text} />
				</Collapse>
			</div>
		</div>
	</div>

</div>

{#snippet label(value: string)}
	<span class='opacity-50'>
		{value}:
	</span>
{/snippet}
