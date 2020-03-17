<template>
	<main id="main-area">
		<textarea id="input-area"></textarea>
		<div id="output-area"></div>
	</main>
</template>

<script>
export default {
	head: {
		bodyAttrs: {
			id: 'main-wrapper'
		},
		script: [
			{ src: './Lambda.js' },
			{ src: './script.js' }
		]
	}
}
</script>

<style lang="sass" scoped>
@import "~/assets/Lambda/style.scss";
</style>
