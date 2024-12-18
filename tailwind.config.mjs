import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@vyke/astro/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['lofi', 'dark'],
	},
	plugins: [
		require('daisyui'),
		iconsPlugin({
			// Select the icon collections you want to use
			// You can also ignore this option to automatically discover all individual icon packages you have installed
			// If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
			collections: getIconCollections(['fa-brands', 'fa-solid', 'fa6-solid']),
			// If you want to use all icons from @iconify/json, you can do this:
			// collections: getIconCollections("all"),
			// and the more recommended way is to use `dynamicIconsPlugin`, see below.
		}),
	],
}
