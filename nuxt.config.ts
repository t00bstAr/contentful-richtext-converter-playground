export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "en"
			},
			link: [
				{rel: "icon", type: "xml/svg", sizes: "32x32", href: "/favicon.svg"}
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
		'nuxt-monaco-editor',
	],
	monacoEditor: {
		// These are default values:
		dest: '_monaco',
		locale: 'en',
		componentName: {
			codeEditor: 'MonacoEditor',
			diffEditor: 'MonacoDiffEditor'
		}
	},
	buildModules: [
		'@nuxtjs/google-fonts',
	],
	colorMode: {
		classSuffix: ''
	},
	// buildModules: [
	//
	// ],
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
