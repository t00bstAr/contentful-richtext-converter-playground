const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		`components/**/*.{vue,js}`,
		`layouts/**/*.vue`,
		`pages/**/*.vue`,
		`composables/**/*.{js,ts}`,
		`mixins/**/*.{js,ts}`,
		`plugins/**/*.{js,ts}`,
		`App.{js,ts,vue}`,
		`app.{js,ts,vue}`
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Sen', ...defaultTheme.fontFamily.sans],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
