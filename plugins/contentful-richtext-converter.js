import {htmlToRichText, richTextToHtml} from 'contentful-richtext-converter';
export default defineNuxtPlugin(() => {
	return {
		provide: {
			htmlToRichText,
			richTextToHtml
		}
	}
})
