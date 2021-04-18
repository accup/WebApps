import colors from 'vuetify/es5/util/colors';


/*
** Environment variables
*/
const env = {
  appName: 'Showcase',
  appTitle: 'Showcase',
  appShortTitle: 'Showcase',
  rootDirName: process.env.npm_package_config_rootDirName,
}
const rootPageDir = `/${env.rootDirName}/${env.appName}/`;


export default {
  ssr: false,
  /*
  ** Router configuration
  */
  router: {
    base: rootPageDir
  },
  /*
  ** Environment Variables
  */
  env,
  /*
  ** `generate` command configuration
  */
  generate: {
    dir: `../../dist${rootPageDir}`,
    fallback: '404.html'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate(title) {
      const rootTitle = 'Showcase';

      if (title == '') {
        return rootTitle;
      } else {
        return `${title} - ${rootTitle}`;
      }
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${rootPageDir}favicon.ico` }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/versionController.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-i18n'
  ],
  /*
  ** nuxt-i18n configuration
  */
  i18n: {
    locales: [
      {
        code: 'ja',
        file: 'ja/index.js'
      },
      {
        code: 'en',
        file: 'en/index.js'
      }
    ],
    defaultLocale: 'ja',
    lazy: true,
    langDir: 'lang/',

    detectBrowserLanguage: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
