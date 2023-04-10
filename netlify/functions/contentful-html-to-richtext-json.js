const {htmlToRichText} = require("contentful-richtext-converter");
const errorMsg = (msg) => {return {error: msg}}
const handler = async (event) => {
	try {
		const {html} = JSON.parse(event.body)
		if(typeof html === 'undefined')
			return {statusCode: 400, body: JSON.stringify(errorMsg('You need to define \'html\' in the json body'))}

		let richText = htmlToRichText(html);
		if(richText){
			return {
				statusCode: 200,
				body: JSON.stringify(richText),
				headers: {'Content-Type': 'application/json'}
			}
		}else{
			return {statusCode: 400, body: JSON.stringify(errorMsg('Somethings went wrong while parsing the html'))}
		}
	} catch (error) {
		return {statusCode: 500, body: error.toString()}
	}
}
module.exports = {handler}
