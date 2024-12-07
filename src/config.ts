type Site = {
	website: string
	author: string
	description: string
	title: string
	titleSlug: string
	lightAndDarkMode: boolean
	postPerPage: number
	ogImage?: string
	themes: {
		dark: string
		light: string
	}
}

export const SITE: Site = {
	website: 'https://tinyapps.vyke.dev',
	author: 'Jose Albizures',
	description:
    'A collection of tiny web apps that are useful for everyday tasks.',
	title: 'Tiny Apps by Vyke',
	titleSlug: 'tinyapps',
	lightAndDarkMode: true,
	postPerPage: 6,
	themes: {
		dark: 'dark',
		light: 'lofi',
	},
}
