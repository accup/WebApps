export default ({ store }) => {
  let { major, minor, patch } = store.state.version;

  // Major version patch
  switch (major) {
    case 1:
      // Minor version patch (Major: 1)
      switch (minor) {
        case 2:
          // Patch version patch (Minor: 0)
          switch (patch) {
            case 1:
            // When next patch version is published, some patches will be here.
          }
      }
  }
}
