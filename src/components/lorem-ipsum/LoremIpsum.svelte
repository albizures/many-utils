<script lang='ts'>
	import { LoremIpsum } from 'lorem-ipsum'

	let amount = $state(3)
	let what = $state<'paragraphs' | 'sentences' | 'words'>('paragraphs')

	const lorem = new LoremIpsum()
	let results = $state<Array<string>>([])

	$effect(() => {
		if (amount > 0) {
			switch (what) {
				case 'paragraphs':
					results = lorem.generateParagraphs(amount).split('\n')
					break
				case 'sentences':
					results = [lorem.generateSentences(amount)]
					break
				case 'words':
					results = [lorem.generateWords(amount)]
					break
			}
		}
	})

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			amount += 1
		}
		else if (event.key === 'ArrowDown') {
			amount -= 1
		}
	}

</script>

<div class='max-w-3xl mx-auto pt-4 w-full'>
	<h1 class='text-center text-3xl'>Lorem Ipsum Generator</h1>

	<p class='text-xl text-center mt-6'>
		Generate
		<input {onkeydown} bind:value={amount} type='number' placeholder='#' class='text-center box-border max-w-16 h-8 border-secondary bg-base-200 mx-1 border-b-4 rounded' />
		of
		<select name='what' bind:value={what} class='text-center box-border px-2 h-8 border-secondary bg-base-200 mx-1 border-b-4 rounded'>
			<option value='paragraphs'>paragraphs</option>
			<option value='sentences'>sentences</option>
			<option value='words'>words</option>
		</select>
	</p>

	<div class='mt-8 mb-20'>
		{#each results as result}
			<p class='mt-4 text-xl'>{result}</p>
		{/each}
	</div>
</div>
