import colors from 'vuetify/es5/util/colors';

const rootPageDir = '/WebApps/BeatsPerMinute/';

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
    dir: '../../dist/BeatsPerMinute'
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
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
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
    manifest: {
      name: 'Beats Per Minute',
      short_name: 'BPM',
      lang: 'ja'
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
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
  ** nuxt-i18n configuration
  */
  i18n: {
    vueI18nLoader: true,
    locales: ['ja'],
    defaultLocale: 'ja',
    vueI18n: {
      fallbackLocale: 'ja'
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
