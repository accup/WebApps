import createPersistedState from 'vuex-persistedstate'


export default ({store}) => {
  createPersistedState({
    key: process.env.appName,
    paths: [
      'version',
    ]
  })(store)
}
