export const state = () => ({
  bpmRange: {
    min: 60,
    max: 240,
  },
  bpmPrecision: 0,
})


export const mutations = {
  setBpmRange(state, { min, max }) {
    state.bpmRange.min = min;
    state.bpmRange.max = max;
  },
  setBpmPrecision(state, precision) {
    state.bpmPrecision = precision;
  },
}
