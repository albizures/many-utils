type Category = 'text' | 'number' | 'calc' | 'date' | 'color' | 'code'

export type Util = {
	title: string
	description: string
	category: Category
	slug: string
}

export const utils: Array<Util> = [
	{
		title: 'Text Counter',
		description: 'Count the number of characters in a text and other statistics',
		category: 'text',
		slug: 'text-counter',
	},
]
