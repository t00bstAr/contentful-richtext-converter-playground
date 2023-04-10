import {htmlToRichText} from 'contentful-richtext-converter'
export default defineNuxtPlugin(() => {
	return {
		provide: {
			htmlToRichText
		}
	}
})
