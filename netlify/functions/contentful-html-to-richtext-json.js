const {htmlToRichText, richTextToHtml} = require("contentful-richtext-converter");
const errorMsg = (msg) => {return {error: msg}}
const handler = async (event) => {
	try {
		const {html,richtext} = JSON.parse(event.body)
		if(typeof html === 'undefined' && typeof richtext === 'undefined')
			return {statusCode: 400, body: JSON.stringify(errorMsg('You need to define \'html\' or \'richtext\' in the json body'))}

		let data = (typeof html !== 'undefined') ? htmlToRichText(html) : richTextToHtml(richtext);
		if(data){
			return {
				statusCode: 200,
				body: JSON.stringify(data),
				headers: {'Content-Type': 'application/json'}
			}
		}else{
			return {statusCode: 400, body: JSON.stringify(errorMsg('Somethings went wrong while parsing the html'))}
		}
	} catch (error) {
		console.log(error)
		return {statusCode: 500, body: error.toString()}
	}
}
module.exports = {handler}
