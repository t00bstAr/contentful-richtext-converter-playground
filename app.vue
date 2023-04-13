<template>
  <div class="font-sans text-[#707070] antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root{
	--dark: #111827;
	--light: #f3f3f3;
}
body {
  /*background-color: var(--light);*/
  /*color: rgba(0,0,0,0.8);*/
	background-color: var(--dark);
	color: #ebf4f1;
}
.dark body {
  background-color: var(--dark);
  color: #ebf4f1;
}
</style>
