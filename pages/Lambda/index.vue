<template>
	<main id="main-area">
		<textarea id="input-area"></textarea>
		<div id="output-area"></div>
	</main>
</template>

<script>
export default {
	head: {
		script: [
			{ src: './Lambda.js' },
			{ src: './script.js' }
		]
	}
}
</script>

<style lang="sass">
@import "~/assets/Lambda/style.scss";
</style>
