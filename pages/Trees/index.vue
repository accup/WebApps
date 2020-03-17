<template>
	<div>
		<canvas class="resizable" id="back"></canvas>
		<canvas class="resizable" id="workspace">HTML5 Canvas 対応のブラウザで開いてください。</canvas>
	</div>
</template>

<script>
export default {
	head: {
		script: [
			{ src: './util.js' },
			{ src: './Trees.js' },
			{ src: './main.js' }
		]
	}
}
</script>

<style lang="sass">
@import "~/assets/Trees/main.scss";
</style>
