<script lang='ts'>
	type Props = {
		label: string
		value: string | number
		testId: string
	}

	let { label, value, testId }: Props = $props()
</script>

<div class='flex w-full justify-between border-b border-b-base-300 border-dashed'>
	<span data-testid={`${testId}-label`} class='opacity-50 text-nowrap text-ellipsis overflow-hidden max-w-36'>
		{label}:
	</span>
	<span data-testid={testId} class='font-bold text-sm text-right text-nowrap text-ellipsis overflow-hidden'>
		{value}
	</span>
</div>
