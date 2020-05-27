import createPersistedState from 'vuex-persistedstate'


export default ({store}) => {
  createPersistedState({
    key: 'BeatsPerMinute',
    paths: [
      'configure'
    ]
  })(store)
}
