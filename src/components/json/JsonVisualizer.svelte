<script lang='ts'>
	import { type DocumentNode, parse } from '@humanwhocodes/momoa'
	import ExpandableUtil from '../ExpandableUtil.svelte'
	import Pane from '../Splitpanes.Pane.svelte'
	import Splitpanes from '../Splitpanes.svelte'
	import Diagram from './JsonVisualizer.Diagram.svelte'
	import DropArea from './JsonVisualizer.DropArea.svelte'
	import Editor from './JsonVisualizer.Editor.svelte'
	import Tree from './JsonVisualizer.Tree.svelte'

	let source = $state(JSON.stringify([
		1, 2, 3,
	// {
		// hello: 'word',
	// foo: {
		// 	nested: true,
		// 	nested2: 2,
		// 	obj: [
		// 		1,
		// 		'3',
		// 		{
		// 			hello: 'world',
		// 		},
		// 		[1, 2, 3],
		// 	],
		// },
	// }
	], null, 2))

	let content = $state(source)

	$effect(() => {
		// the source can be changed by the user droping a file
		// so we need to update the content when the source changes
		content = source
	})

	const ast = $derived<DocumentNode>(parse(content))

</script>

<ExpandableUtil class='px-6 flex flex-1' expandedClass='pt-6'>
	<DropArea bind:content={content} />
	<Splitpanes>
		<Pane>
			<Editor bind:content={content} />
		</Pane>
		<Pane>
			<Tree ast={ast} />
		</Pane>
		<Pane>
			<Diagram ast={ast} />
		</Pane>
	</Splitpanes>
</ExpandableUtil>
