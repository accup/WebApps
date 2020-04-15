<template>
	<div id='main'>
		<div id='beatViewer'>
			<div id='beatCircle' ref='beatCircle'></div>
		</div>
		<div id='bpmViewer'>
			<div id='bpmTextWrapper'>
				{{ (bps * 60.0).toFixed() }}
				<span class='small-caps'>BPM</span>
			</div>
		</div>
		<div id='controller'
				@mousedown.prevent="beat"
				@mouseup.prevent="deactivateBeatButton"
				@touchstart.prevent="beat"
				@touchend.prevent="deactivateBeatButton">
			<div id='beatButton' ref='beatButton'>
				{{ beatButtonText }}
			</div>
		</div>
	</div>
</template>

<script>
import { BeatEstimator } from '@/modules/BeatsPerMinute';


const beatEstimator = new BeatEstimator(
	60.0 / 60,
	240.0 / 60,
	180
);
let resetTimerId = null;


export default {
	data: () => ({
		bps: beatEstimator.estimatedBps,
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
	mounted() {
		const updateBeatCircleLoop = () => {
			this.updateBeatCircleScale();
			requestAnimationFrame(updateBeatCircleLoop);
		}

		this.$nextTick(updateBeatCircleLoop);
	},
	methods: {
		beat() {
			if (this.beatCount == 0) {
				beatEstimator.reset();
			}

			beatEstimator.beat(performance.now() / 1000.0);
			this.bps = beatEstimator.estimatedBps;
			++this.beatCount;

			this.$refs.beatButton.classList.add('active');

			if (resetTimerId != null) {
				clearTimeout(resetTimerId);
			}
			resetTimerId = setTimeout(this.resetBeatEstimator, 2000);
		},
		deactivateBeatButton() {
			this.$refs.beatButton.classList.remove('active');
		},
		resetBeatEstimator() {
			resetTimerId = null;
			beatEstimator.reset();
			this.beatCount = 0;
		},
		updateBeatCircleScale() {
			const bps = beatEstimator.estimatedBps;
			const anchorTimeInSeconds = beatEstimator.estimatedAnchorTimeInSeconds;
			const nowTimeInSeconds = performance.now() / 1000.0;
			const elapsedTimeInSeconds = nowTimeInSeconds - anchorTimeInSeconds;

			const phase = (elapsedTimeInSeconds * bps) % 1.0;
			if (phase < 0.0) {
				phase += 1.0;
			}
			this.$refs.beatCircle.style.opacity = 1.0 - 0.7 * phase;
		}
	},
	head: {
		link: [
			{ rel:'icon', type:'image/png', href:'favicon.png' }
		]
	}
}
</script>

<style lang="scss" scoped>
#main {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: 0;

	background-color: #080010;

	display: flex;
	flex-direction: column;

	#beatViewer {
		flex: 2 0 0px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		#beatCircle {
			width: 3em;
			height: 3em;
			border-radius: 1.5em;

			background-color: dodgerblue;

			transform-origin: 50% 50%;
		}
	}

	#bpmViewer {
		flex: 1 0 0px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		#bpmTextWrapper {
			color: white;
			font-size: 2.4em;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		}
	}

	#controller {
		flex: 4 0 0px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		#beatButton {
			flex: 0 0 8em;
			width: 8em;

			color: deepskyblue;
			background-color: rgba(deepskyblue, 0.2);
			border: 3px solid deepskyblue;
			border-radius: 4em;
			font-size: 1.5em;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

			text-align: center;
			vertical-align: middle;
			line-height: 8em;

			transition: border-color 1s ease-out;

			&.active {
				transition: border-color 0s;
				border-color: rgba(deepskyblue, 0.2);
			}
			&:focus {
				outline: none;
			}
		}
	}
}

.small-caps {
	font-variant: small-caps;
}
</style>
