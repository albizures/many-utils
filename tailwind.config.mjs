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
	],
}
