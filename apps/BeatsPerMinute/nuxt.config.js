import colors from 'vuetify/es5/util/colors';

const rootDirName = process.env.npm_package_config_rootDirName;
const rootPageDir = `/${rootDirName}/BeatsPerMinute/`;


export default {
  mode: 'spa',
  /*
  ** Router configuration
  */
  router: {
    base: rootPageDir
  },
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
    titleTemplate (title) {
      const rootTitle = 'Beats Per Minute';

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
      { hid: 'description', name: 'description', content: 'BPM簡易測定ツール' }
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
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],
  /*
  ** PWA configuration
  */
  pwa: {
    workbox: {
      cachingExtensions: '@/plugins/workbox-vuetify-assets.js'
    },
    manifest: {
      name: 'Beats Per Minute',
      short_name: 'BPM',
      lang: 'ja',
      start_url: rootPageDir
    }
  },
  /*
  ** nuxt-i18n configuration
  */
  i18n: {
    locales: [
      {
        code: 'ja',
        file: 'ja/index.js'
      }
    ],
    defaultLocale: 'ja',
    lazy: true,
    langDir: 'lang/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Noto Sans JP'
      },
      icons: false
    },
    icons: {
      iconfont: 'mdiSvg'
    },
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
