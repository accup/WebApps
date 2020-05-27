export const state = () => ({
  bpmRange: {
    min: 60,
    max: 240,
  },
  bpmStep: 1,
})


export const mutations = {
  setBpmRange (state, {min, max}) {
    state.bpmRange.min = min;
    state.bpmRange.max = max;
  },
  setBpmStep (state, step) {
    state.bpmStep = step;
  },
}
