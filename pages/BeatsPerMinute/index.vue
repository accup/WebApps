<template>
	<div id='main'>
		<div id='bpmViewer'>
			{{ (bps * 60.0).toFixed() }}
			<span class='small-caps'>BPM</span>
		</div>
		<div id='controller'>
			<button id='beatButton' @click="beat">
				{{ beatButtonText }}
			</button>
		</div>
	</div>
</template>

<script>
import { BeatEstimator } from '@/assets/BeatsPerMinute/BeatFilter.ts';


const beatEstimator = new BeatEstimator(
	60.0 / 60,
	240.0 / 60,
	180
);
let resetTimerId = null;


export default {
	data: () => ({
		bps: 2.0,
		beatCount: 0
	}),
	computed: {
		beatButtonText() {
			if (this.beatCount == 0) {
				return 'Beat';
			} else {
				return `${this.beatCount}`;
			}
		}
	},
	methods: {
		beat() {
			if (this.beatCount == 0) {
				beatEstimator.reset();
			}
			
			beatEstimator.beat(performance.now() / 1000.0);
			this.bps = beatEstimator.estimatedBps;
			++this.beatCount;
			
			if (resetTimerId != null) {
				clearTimeout(resetTimerId);
			}
			resetTimerId = setTimeout(this.resetBeatEstimator, 2000);
		},
		resetBeatEstimator() {
			resetTimerId = null;
			beatEstimator.reset();
			this.beatCount = 0;
		}
	}
}
</script>

<style lang="scss" scoped>
#main {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	
	background-color: #080010;
	
	display: grid;
	grid-template-rows: 1fr 1fr 2fr;
	
	#bpmViewer {
		grid-row: 2;
		
		margin: auto;
		
		color: white;
		font-size: 2.4em;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-align: center;
	}
	
	#controller {
		grid-row: 3;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		#beatButton {
			flex: 0 0 10em;
			width: 10em;
		}
	}
}

.small-caps {
	font-variant: small-caps;
}
</style>