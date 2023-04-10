<template>
	<div v-html="renderedHtml"></div>
</template>

<script setup>
const props = defineProps({
	json: {
		type: Object,
		required: true
	}
})

const renderedHtml = computed(() => {
	if(typeof props.json.content === 'undefined') return ''
	return renderNode(props.json);
});

function renderNode(node) {
	if (node.nodeType === 'document') {
		return node.content.map(renderNode).join('')
	}
	if (node.nodeType === 'text') {
		let text = node.value
		node.marks.forEach((mark) => {
			switch (mark.type) {
				case 'bold':
					text = `<strong>${text}</strong>`
					break
				case 'italic':
					text = `<em>${text}</em>`
					break
				case 'underline':
					text = `<u>${text}</u>`
					break
				case 'superscript':
					text = `<sup>${text}</sup>`
					break
				case 'subscript':
					text = `<sub>${text}</sub>`
					break
				case 'code':
					text = `<pre><code>${text}</code></pre>`
					break
			}
		})
		return text
	}
	const sub = node.content.map(renderNode).join('')
	let tagNameMap = {
		'paragraph': 'p',
		'heading-1': 'h1',
		'heading-2': 'h2',
		'heading-3': 'h3',
		'heading-4': 'h4',
		'heading-5': 'h5',
		'heading-6': 'h6',
		'unordered-list': 'ul',
		'ordered-list': 'ol',
		'list-item': 'li',
		'text':'span',
		'blockquote': 'blockquote',
		'hr':'hr',
		'table': 'table',
		'table-row': 'tr',
		'table-header-cell': 'th',
		'table-cell': 'td'
	}
	switch (node.nodeType) {
		case 'paragraph':
		case 'heading-1':
		case 'heading-2':
		case 'heading-3':
		case 'heading-4':
		case 'heading-5':
		case 'heading-6':
		case 'list-item':
		case 'ordered-list':
		case 'unordered-list':
		case 'blockquote':
		case 'table':
		case 'table-row':
		case 'table-header-cell':
		case 'table-cell':
			return `<${tagNameMap[node.nodeType]}>${sub}</${tagNameMap[node.nodeType]}>`
		case 'hr':
			return `<hr/>`
		case 'hyperlink':
			return `<a href="${node.data.uri}" target="${node.data.target}" rel="${node.data.rel}">${sub}</a>`
		// case 'embedded-asset-block':
		// 	return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}">`
		default:
			return sub
	}
}

</script>
