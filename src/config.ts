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
	website: 'https://manyutils.com',
	author: 'Jose Albizures',
	description:
    'A collection of tiny web apps that are useful for everyday tasks.',
	title: 'Many Utils',
	titleSlug: 'Many Utils',
	lightAndDarkMode: true,
	postPerPage: 6,
	themes: {
		dark: 'dark',
		light: 'lofi',
	},
}
