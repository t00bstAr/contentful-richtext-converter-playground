export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "en"
			},
			link: [
				{rel: "icon", type: "xml/svg", sizes: "32x32", href: "/contentful-richtext-converter-icon.svg"}
			]
		}
	},
	vite: {
		server: {
			fs: {
				allow: ["/Users/tobiaseriksen/Documents/projects/T00BSTAR/contentful-richtext-converter"]
			}
		}
	},
	modules: [
		'@nuxtjs/color-mode',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
	],
	colorMode: {
		classSuffix: ''
	},
	buildModules: [
		'@nuxtjs/google-fonts',
	],
	googleFonts: {
		families: {
			Sen: {
				wght: [400, 700]
			},
		},
		display: 'swap',
		prefetch: true,
		preconnect: true,
		preload: true,
	}
})
