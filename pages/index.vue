<template>
	<div class="flex flex-col h-screen">
		<AppHeader class="flex-none" />
		<div class="flex-grow">
			<div ref="slider" class="snap-mandatory snap-x hide-scrollbars overflow-x-auto flex flex-row lg:grid lg:grid-cols-12 h-full lg:justify-between">
				<div v-intersection-observer="htmlIntersectionObserver" class="snap-start min-w-[100vw] lg:min-w-[auto] lg:col-span-4 h-full relative">
					<ItemPill>HTML</ItemPill>
<!--					<MonacoEditor class="absolute inset-0 z-[1] bg-transparent" v-model="html" lang="html" :options="options" />-->
					<textarea spellcheck="false" class="absolute inset-0 outline-none p-8 bg-[#111827] text-white resize-none font-mono text-[14px]" v-model="html" placeholder="Write some HTML here..." />
				</div>
				<div v-intersection-observer="jsonIntersectionObserver" class="snap-center min-w-[100vw] overflow-x-hidden lg:min-w-[auto] lg:col-span-4 h-[calc(100vh-64px)] overflow-y-auto bg-white/5 relative">
					<ItemPill class="sticky float-right">JSON</ItemPill>
					<client-only>
						<pre v-if="activeShow === 'output'" class="p-8 text-[14px]">{{output.json}}</pre>
					</client-only>
				</div>
				<div v-intersection-observer="outputIntersectionObserver" class="snap-center min-w-[100vw] lg:min-w-[auto] lg:col-span-4 h-[calc(100vh-64px)] overflow-y-auto bg-white/10 relative">
					<ItemPill class="sticky float-right">OUTPUT</ItemPill>
					<client-only>
						<div v-if="output.html" class="p-8 prose prose-invert" v-html="output.html" />
					</client-only>
				</div>
			</div>
		</div>
	</div>
	<div v-if="showToggleSwitches" class="scale-90 sm:scale-100 origin-center flex fixed z-10 bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white space-x-2">
		<div :class="htmlIsValid ? 'bg-[#2ad42a]' : 'bg-[#e33454]'" class="grid place-items-center w-[48px] h-[48px] rounded-full text-white">
			<svg v-if="htmlIsValid" class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
			<svg v-else class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
		</div>
		<div class="flex flex-row space-x-2 lg:hidden">
			<button @click="x = getX(0)" class="px-4 h-[48px] rounded-full" :class="htmlScreenIsVisible ? 'bg-gray-800 text-white': 'bg-gray-200'">HTML</button>
			<button @click="x = getX(1)" class="px-4 h-[48px] rounded-full" :class="jsonScreenIsVisible ? 'bg-gray-800 text-white': 'bg-gray-200'">JSON</button>
			<button @click="x = getX(2)" class="px-4 h-[48px] rounded-full" :class="outputScreenIsVisible ? 'bg-gray-800 text-white': 'bg-gray-200'">OUTPUT</button>
		</div>
		<button v-if="activeShow === 'output'" @click="copyToClipboard" :disabled="!htmlIsValid" class="grid place-items-center w-[48px] h-[48px] rounded-full bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed">
			<svg v-if="copied" class="w-[24px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
			<svg v-else class="w-[16px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
		</button>
	</div>
</template>

<script setup>
import { vIntersectionObserver } from '@vueuse/components'
import { useScroll } from '@vueuse/core'
const { $htmlToRichText, $richTextToHtml } = useNuxtApp()

useHead({
	title: 'Contentful RichText Converter - Playground',
	meta: [
		{ name: 'description', content: 'Easily convert HTML to Contentful RichText with contentful-richtext-converter package. Test in the playground and implement in your migration. Happy coding!' }
	]
})

const getX = (value) => {
	if(process.client)
		return window.innerWidth * value
}

const slider = ref(null)
const { x } = useScroll(slider, { behavior: 'smooth' })

const htmlScreenIsVisible = ref(false);
const jsonScreenIsVisible = ref(false);
const outputScreenIsVisible = ref(false);

const htmlIntersectionObserver = ([{ isIntersecting }]) => htmlScreenIsVisible.value = isIntersecting
const jsonIntersectionObserver = ([{ isIntersecting }]) => jsonScreenIsVisible.value = isIntersecting
const outputIntersectionObserver = ([{ isIntersecting }]) => outputScreenIsVisible.value = isIntersecting

const showToggleSwitches = ref(true)
const activeShow = ref('output')
const html = ref('<p>Write or drop your HTML here...</p>')
const copied = ref(false)

const options = {
	automaticLayout: true,
	minimap: { enabled: false },
	autoIndent: 'none',
	theme: 'vs-dark'
}

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

const output = computed(() => {
	if(!process.client) return true
	let json = ($htmlToRichText(html.value)) ? $htmlToRichText(html.value) : {}
	return {
		json: json,
		html: $richTextToHtml(json)
	}
})

const copyToClipboard = () => {
	let data = Object.assign({}, $htmlToRichText(html.value))
	navigator.clipboard.writeText(JSON.stringify(data));
	copied.value = true
	setTimeout( () => {
		copied.value = false
	}, 2000)
}

// onMounted( () => {
// 	html.value = testHtml
// })
</script>

<style lang="postcss">
.monaco-editor{@apply py-8;}
.monaco-editor, .monaco-editor .margin, .monaco-editor-background{@apply !bg-transparent;}
</style>
