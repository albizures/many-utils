import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { SITE } from './src/config'

// https://astro.build/config
export default defineConfig({
	site: SITE.website,
	devToolbar: {
		enabled: false,
	},
	integrations: [svelte(), tailwind(), sitemap(), icon()],
})
