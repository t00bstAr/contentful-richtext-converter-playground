<template>
	<div class="flex h-screen justify-between">
		<div v-if="showToggleSwitches" class="flex absolute z-10 bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white space-x-2">
			<div :class="htmlIsValid ? 'bg-[#2ad42a]' : 'bg-[#e33454]'" class="grid place-items-center w-[48px] h-[48px] rounded-full text-white">
				<svg v-if="htmlIsValid" class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
				<svg v-else class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
			</div>
			<button @click="activeShow = 'output'" class="w-[120px] h-[48px] rounded-full" :class="activeShow === 'output' ? 'bg-gray-800 text-white': 'bg-gray-200'">Output</button>
			<button v-if="activeShow === 'output'" @click="copyToClipboard" :disabled="!htmlIsValid" class="grid place-items-center w-[48px] h-[48px] rounded-full bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed">
				<svg v-if="copied" class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
				<svg v-else class="w-[16px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
			</button>
			<!--<button @click="activeShow = 'contentful'" class="w-[120px] h-[48px] rounded-full" :class="activeShow === 'contentful' ? 'bg-gray-800 text-white': 'bg-gray-200'">Contentful</button>-->
		</div>
		<div class="basis-1/3 relative">
			<textarea spellcheck="false" class="absolute inset-0 w-full h-full outline-none p-8 bg-[#111827] text-white" v-model="html" />
		</div>
		<div class="basis-1/3 h-full overflow-y-auto bg-white bg-opacity-10">
			<client-only>
				<pre v-if="activeShow === 'output'" class="p-8">{{theHTML}}</pre>
				<pre v-if="activeShow === 'contentful'" class="p-8">{{testOutputFromContentful}}</pre>
			</client-only>
		</div>
		<div class="basis-1/3 h-full overflow-y-auto relative">
			<RichTextToHtml class="p-8 prose dark:prose-invert" :json="theHTML" />
		</div>
	</div>
</template>

<script setup>
const { $htmlToRichText } = useNuxtApp()
//import {htmlToRichText} from "contentful-richtext-converter"

const testHtmlPartial = `<table>
<thead>
<tr>
<th><p>Name</p></th>
<th><p>Job</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>John Doe</p></td>
<td><p>Random guy</p></td>
</tr>
<tr>
<td><p>Jane Doe</p></td>
<td><p>Random girl</p></td>
</tr>
</tbody>
</table>`
const testHtml = `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p><strong><u>Here is our test with all bold and underline</u></strong></p>
<p><strong>Here is another test with some <u>underline</u> all bold</strong></p>
<p>Some text before <strong>Here is another test with <u>some underline</u> all bold</strong> and some text after</p>
<p>Some text before <strong>Here is <em>another</em> test with <u>some <em>underline</em></u> all bold</strong> and some text after</p>
<p>Right before the entries, first and Entry:</p>
<div data-sys-id="PNWhBnhdIraVxVsZeZUaH">Oprettelse af nyt land</div>
<p>Then a smart inline entry. And it's in between <span data-sys-id="PNWhBnhdIraVxVsZeZUaH">Oprettelse af nyt land</span> a paragraph!</p>
<p>Just a random paragraph text</p>
<img src="https://images.ctfassets.net/t0hwtvlfxz09/3WGalhNpBnyMH4oOue7Lov/b29e0c9d62f6fc6abd1f645febba5512/Sk__rmbillede_2023-02-01_kl._21.58.57.png" alt="image test" />
<p>Links testing</p>
<p><a data-sys-id="PNWhBnhdIraVxVsZeZUaH" href="whatever-link">Entry link</a></p>
<p><a href="https://images.ctfassets.net/t0hwtvlfxz09/3WGalhNpBnyMH4oOue7Lov/b29e0c9d62f6fc6abd1f645febba5512/Sk__rmbillede_2023-02-01_kl._21.58.57.png">Asset link</a></p>
<p><a href="https://mindthemedia.com">Url link</a></p>
<p>And a <a href="#">paragraph with and inline</a> link</p>
<p>Another paragraph within <strong>inline</strong> bold</p>
<p><strong>Another paragraph with all bold</strong></p>
<p>A third with italic <em>inline</em> text</p>
<p><em>A third with paragraph all italic</em></p>
<p>Now with an <u>inline</u> underline</p>
<p><u>And with all underline</u></p>
<p>Enable sup<sup>1</sup> and sub<sub>2</sub> can even work</p>
<p><code>Do some coding???</code></p>
<p>Maybe just a paragraph</p>
<p>Add some unordered bullets</p>
<ul>
<li><p>Bullet 1</p></li>
<li><p>Bullet 2</p></li>
<li><p>Bullet 3</p></li>
</ul>
<p>Add some ordered bullets</p>
<ol>
<li><p>Bullet 1</p></li>
<li><p>Bullet 2</p></li>
<li><p>Bullet 3</p></li>
</ol>
<blockquote><p>Maybe even a blockquote</p></blockquote>
<hr/>
<p>Just a splitter before kicking in the end with a table</p>
<table>
<thead>
<tr>
<th><p>Name</p></th>
<th><p>Job</p></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>John Doe</p></td>
<td><p>Random guy</p></td>
</tr>
<tr>
<td><p>Jane Doe</p></td>
<td><p>Random girl</p></td>
</tr>
</tbody>
</table>
<p>And thats it!</p>
<p>Next interesting thing would be links, entries, inline entries and assets ;)</p>`

import testOutputFromContentful from '../constants/testFromContentful'

const showToggleSwitches = ref(true)
const activeShow = ref('output')
const html = ref('')
const copied = ref(false)

onMounted( () => {
	html.value = testHtml
})

//const nodesToAllow = ['H1','H2','H3','H4','H5','H6','P','UL','OL','LI','BLOCKQUOTE','TABLE','THEAD','TBODY','TFOOT','TR','TH','TD','STRONG','B','EM','I','U','SUP','SUB','CODE','A','IMG','HR','DIV','SPAN']
const htmlIsValid = computed(() => {
	if(!process.client) return true
	let parser = new DOMParser();
	let test = '<!DOCTYPE html><html lang="en"><head><title>Testing</title></head><body>' + $htmlToRichText(html.value) + '</body></html>';
	let doc = parser.parseFromString(test, "application/xml");
	let errorNode = doc.querySelector('parsererror');
	if (errorNode) {
		console.log(errorNode)
		return false
	} else {
		return true
	}
})

const theHTML = computed(() => {
	//if(!process.client) return true
	return $htmlToRichText(html.value)
})

const copyToClipboard = () => {
	let data = Object.assign({}, htmlToRichText(html.value))
	navigator.clipboard.writeText(JSON.stringify(data));
	copied.value = true
	setTimeout( () => {
		copied.value = false
	}, 2000)
}

// Define a function to recursively loop through the DOM tree and remove div and span nodes
/*function removeDivsAndSpans(node) {
	// Remove classes from the current node
	node.classList.remove(...node.classList);

	// Recursively remove divs and spans from child nodes
	if (node.hasChildNodes()) {
		const children = node.childNodes;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child.nodeType === Node.ELEMENT_NODE) {
				removeDivsAndSpans(child);
			}
		}
	}

	if(node.nodeType === Node.ELEMENT_NODE && !nodesToAllow.includes(node.nodeName)){
		node.parentNode.removeChild(node)
	}

	if (node.nodeType === Node.ELEMENT_NODE && (node.nodeName === "DIV" || node.nodeName === "SPAN")) {
		// Check if the node has a "data-sys-id" attribute
		const dataSysId = node.getAttribute("data-sys-id");
		if (!dataSysId) {
			const parentNode = node.parentNode;
			// Move child nodes up one level in the DOM tree
			while (node.firstChild) {
				const child = node.removeChild(node.firstChild);
				if (child.nodeType === Node.ELEMENT_NODE) {
					// Remove classes from child nodes
					child.classList.remove(...child.classList);

					// Move child node up one level in the DOM tree
					parentNode.insertBefore(child, node);
				} else if (child.nodeType === Node.TEXT_NODE) {
					if (child.textContent.trim() !== '') {
						if (parentNode.lastChild === node) {
							// If last child of parent is text node, append text to parent instead of inserting before node
							parentNode.appendChild(child);
						} else {
							parentNode.insertBefore(child, node);
						}
					}
				}
			}

			// Remove the current node
			parentNode.removeChild(node);
		}
	} else if (node.nodeType === Node.ELEMENT_NODE && (node.nodeName === "LI" || node.nodeName === "TD" || node.nodeName === "TH")) {
		// Wrap plaintext nodes and non-heading, non-paragraph elements with a p element
		const childNodes = node.childNodes;
		for (let i = 0; i < childNodes.length; i++) {
			const child = childNodes[i];
			if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
				const p = document.createElement("p");
				p.textContent = child.textContent;
				node.replaceChild(p, child);
				i--;
			} else if (child.nodeType === Node.ELEMENT_NODE && !["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(child.nodeName)) {
				const p = document.createElement("p");
				p.appendChild(child.cloneNode(true));
				node.replaceChild(p, child);
				i--;
			}
		}
	}

	return node;
}*/

// Fix unwanted data or missing tag-closings
/*function fixTagsAndSpaces(htmlString) {
	const regex = /<img\s+[^>]*src="([^"]*)"[^>]*(?<!\/)>/gi;
	htmlString = htmlString.replace(regex, function(match) {
		if (match.endsWith('/>')) {
			return match;
		} else {
			return match.slice(0, -1) + '/>';
		}
	}); // Escape Img tags not closed
	htmlString = htmlString.replace(/&(?!\w+;)/g, '&amp;'); // Escape AMP
	htmlString = htmlString.replace(/&nbsp;/g, ' '); // Remove none-breaking-space
	htmlString = htmlString.replace(/<br>/g, '<br/>'); // Close breaks
	htmlString = htmlString.replace(/<hr>/g, '<hr/>'); // Close hr
	return htmlString;
}*/

// Contentful
/*const contentHandler = (nodes,parentMarks) => {
	let array = []
	let rows = Array.from(nodes).filter(node => node.nodeName === 'TR')
	if(rows.length > 0){
		for(let i=0; i < rows.length; i++){
			let row = {
				"nodeType": "table-row",
				"data": {},
				"content": Array.from(rows[i].childNodes).map(node => nodesToContentful(node,parentMarks)).filter(el => el !== false)
			}
			array.push(row)
		}
	}else{
		Array.from(nodes).forEach(node => {
			const result = nodesToContentful(node,parentMarks);
			if(result !== false) {
				if(Array.isArray(result)) {
					array = array.concat(result)
				} else {
					array.push(result);
				}
			}
		})
	}
	return array
}
*/
/*const nodesToContentful = (node,marks) => {
	const nodeNameMap = {
		'H1': 'heading-1',
		'H2': 'heading-2',
		'H3': 'heading-3',
		'H4': 'heading-4',
		'H5': 'heading-5',
		'H6': 'heading-6',
		'P': 'paragraph',
		'UL': 'unordered-list',
		'OL': 'ordered-list',
		'LI': 'list-item',
		'BLOCKQUOTE': 'blockquote',
		'TABLE': 'table',
		'TH': 'table-header-cell',
		'TD': 'table-cell'
	}
	const markTypeMap = {
		'STRONG': 'bold',
		'B': 'bold',
		'EM': 'italic',
		'I': 'italic',
		'U': 'underline',
		'SUP': 'superscript',
		'SUB': 'subscript',
		'CODE': 'code'
	}
	switch (node.nodeName) {
		case 'H1':
		case 'H2':
		case 'H3':
		case 'H4':
		case 'H5':
		case 'H6':
		case 'P':
		case 'UL':
		case 'OL':
		case 'LI':
		case 'BLOCKQUOTE':
		case 'TABLE':
		case 'TH':
		case 'TD':
			return {
				nodeType: nodeNameMap[node.nodeName],
				data: {},
				content: contentHandler(node.childNodes)
			}
		case 'THEAD':
		case 'TBODY':
			return contentHandler(node.childNodes)
		case 'STRONG':
		case 'B':
		case 'EM':
		case 'I':
		case 'U':
		case 'SUP':
		case 'SUB':
		case 'CODE':
			marks = typeof marks !== 'undefined' ? [...marks] : [];
			marks.push({type: markTypeMap[node.nodeName]})
			return contentHandler(node.childNodes, marks)
		case 'A':
			let type = false
			let value = ''
			let data = {}
			let types = {
				entry: 'entry-hyperlink',
				asset: 'asset-hyperlink',
				url: 'hyperlink'
			}
			if(typeof node.dataset.sysId !== 'undefined')
			{
				type = types['entry']
				value = node.dataset.sysId
				data = {
					"target": {
						"sys": {
							"id": value,
							"type": "Link",
							"linkType": "Entry"
						}
					}
				}
			}
			else if(typeof node.href !== 'undefined' && node.href.includes('images.ctfassets.net'))
			{
				type = types['asset']
				value = node.href.split("/")[4]
				data = {
					"target": {
						"sys": {
							"id": value,
							"type": "Link",
							"linkType": "Asset"
						}
					}
				}
			}
			else if(typeof node.href !== 'undefined')
			{
				type = types['url']
				value = node.href
				data = {
					"uri": value
				}
			}
			if(type) {
				return {
					nodeType: type,
					data: data,
					content: [
						{
							nodeType: 'text',
							value: node.textContent,
							marks: [],
							data: {},
						}
					]
				}
			}else{
				return {
					nodeType: 'text',
					value: node.textContent,
					marks: [],
					data: {},
				}
			}
		case 'IMG':
			if(typeof node.src !== 'undefined' && node.src.includes('images.ctfassets.net')){
				let value = node.src.split("/")[4]
				return {
					nodeType: 'embedded-asset-block',
					data: {
						"target": {
							"sys": {
								"id": value,
								"type": "Link",
								"linkType": "Asset"
							}
						}
					},
					content: []
				}
			} else {
				return false
			}
		case 'HR':
			return {
				"nodeType": "hr",
				"data": {},
				"content": []
			}
		case 'DIV':
			if(typeof node.dataset.sysId !== 'undefined'){
				let value = node.dataset.sysId
				return {
					nodeType: "embedded-entry-block",
					data: {
						"target": {
							"sys": {
								"id": value,
								"type": "Link",
								"linkType": "Entry"
							}
						}
					},
					content: []
				}
			}
			else
			{
				return false
			}
		case 'SPAN':
			if(typeof node.dataset.sysId !== 'undefined'){
				let value = node.getAttribute('data-sys-id')
				return {
					nodeType: "embedded-entry-inline",
					data: {
						"target": {
							"sys": {
								"id": value,
								"type": "Link",
								"linkType": "Entry"
							}
						}
					},
					content: []
				}
			}
			else
			{
				return false
			}
		default:
			marks = typeof marks !== 'undefined' ? marks : [];
			if(node.textContent === '\n' || node.textContent === '' || node.textContent === ' ') return false
			let textNode = {
				nodeType: 'text',
				value: node.textContent,
				marks: marks,
				data: {},
			}
			return textNode
	}
}
*/

// Converter
/*
const htmlToRichText = (html) => {
	if(!process.client) return ''
	const start = performance.now()

	// Pre render handler
	let doc = new DOMParser().parseFromString(fixTagsAndSpaces(html), 'text/html')
	doc.body = removeDivsAndSpans(doc.body)

	const nodes = Array.from(doc.body.childNodes)

	// Render handler
	const contentfulNodes = nodes.map(node => {
		return nodesToContentful(node)
	}).filter(el => el !== false)

	// After render handler

	// Performance check
	const duration = performance.now() - start
	console.log("Performance: ", duration + 'ms')

	return contentfulNodes.length > 0 ? {
		nodeType: 'document',
		data: {},
		content: contentfulNodes
	} : 'Write some HTML...'

}*/
</script>
