<template>
  <v-container
    fluid
    fill-height
    class="pa-0 d-flex flex-column align-stretch"
    >
    <div id="beatViewer">
      <div
        id="beatCircle"
        :style="{ opacity: 1.0 - 0.7 * beatPhase }"
        >
      </div>
    </div>
    <div id="bpmViewer">
      <div id="bpmTextWrapper" class="display-2">
        {{ (bps * 60.0).toFixed() }}
        <span class="display-1">BPM</span>
      </div>
    </div>
    <div
      id="controller"
      @mousedown.prevent="activateBeatButton"
      @mouseup.prevent="deactivateBeatButton"
      @touchstart.prevent="activateBeatButton"
      @touchend.prevent="deactivateBeatButton"
      >
      <div
        id="beatButton"
        :class="{ active: isBeatButtonActive }"
        >
        {{ beatButtonText }}
      </div>
    </div>
  </v-container>
</template>

<script>
import { BeatEstimator } from '@/modules/BeatsPerMinute';


export default {
  beatEstimator: null,
  resetTimerId: null,

  data () {
    const beginBpm = this.$store.state.configure.bpmRange.min;
    const endBpm = this.$store.state.configure.bpmRange.max;
    const bpmStep = this.$store.state.configure.bpmStep;

    const beatEstimator = new BeatEstimator(
      beginBpm / 60.0,
      endBpm / 60.0,
      Math.round((endBpm - beginBpm) / bpmStep)
    );
    this.$options.beatEstimator = beatEstimator;

    return {
      bps: beatEstimator.estimatedBps,
      beatCount: 0,
      beatPhase: 0.0,
      isBeatButtonActive: false
    }
  },
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
    activateBeatButton() {
      const beatEstimator = this.$options.beatEstimator;

      if (this.beatCount == 0) {
        beatEstimator.reset();
      }

      beatEstimator.beat(performance.now() / 1000.0);
      this.bps = beatEstimator.estimatedBps;
      ++this.beatCount;

      this.isBeatButtonActive = true;

      const resetTimerId = this.$options.resetTimerId;
      if (resetTimerId != null) {
        clearTimeout(resetTimerId);
      }
      this.$options.resetTimerId = setTimeout(this.resetBeatEstimator, 2000);
    },
    deactivateBeatButton() {
      this.isBeatButtonActive = false;
    },
    resetBeatEstimator() {
      const beatEstimator = this.$options.beatEstimator;

      this.$options.resetTimerId = null;
      beatEstimator.reset();
      this.beatCount = 0;
    },
    updateBeatCircleScale() {
      const beatEstimator = this.$options.beatEstimator;

      const bps = beatEstimator.estimatedBps;
      const anchorTimeInSeconds = beatEstimator.estimatedAnchorTimeInSeconds;
      const nowTimeInSeconds = performance.now() / 1000.0;
      const elapsedTimeInSeconds = nowTimeInSeconds - anchorTimeInSeconds;

      const phase = (elapsedTimeInSeconds * bps) % 1.0;
      if (phase < 0.0) {
        phase += 1.0;
      }
      this.beatPhase = phase;
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  #beatViewer {
    flex: 4 0 0;

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
    flex: 2 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #bpmTextWrapper {
      color: white;
      font-size: 2.4em;
    }
  }

  #controller {
    flex: 7 0 0;

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
</style>
