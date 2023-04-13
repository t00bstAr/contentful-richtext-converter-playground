<template>
	<nav class="text-white bg-black/25 border-gray-700">
		<div class="flex flex-wrap items-center justify-between mx-auto p-3 sm:p-4">
			<a href="#" class="flex items-center">
				<LogoIcon class="w-8 h-8 mr-2 fill-current" />
				<span class="flex flex-col sm:flex-row self-center text-sm sm:text-xl lg:text-2xl whitespace-nowrap text-white sm:space-x-3">
					<span class="font-semibold">Playground</span>
					<span class="hidden sm:inline-block">//</span>
					<span>Contentful RichText Converter</span>
				</span>
			</a>
			<div class="flex items-center space-x-4">
				<NuxtLink to="https://github.com/t00bstAr/contentful-richtext-converter">
					<GithubIcon class="fill-current" />
				</NuxtLink>
				<NuxtLink to="https://www.npmjs.com/package/contentful-richtext-converter">
					<NpmIcon />
				</NuxtLink>
			</div>
		</div>
	</nav>
</template>
<script setup>
import LogoIcon from "@/assets/svg/contentful-richtext-converter-icon.svg?component"
import GithubIcon from "@/assets/svg/github.svg?component"
import NpmIcon from "@/assets/svg/npmjs.svg?component"
</script>
