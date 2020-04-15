<template>
  <v-app dark>
    <h1>
      {{ this.error.statusCode }} {{ this.status.text }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<i18n lang="yaml">
ja:
  status:
    404:
      text: "ファイルが見つかりませんでした。"
    418:
      text: "俺は急須だ。湯呑に注いでやれ。"
    default:
      text: "エラーが発生しました。"
en:
  status:
    404:
      text: "Not Found"
    418:
      text: "I'm a teapot"
    default:
      text: "An error occured"
</i18n>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    status () {
      switch (this.error.statusCode) {
      case 404:
        return {
          message: "Not Found",
          text: this.$i18n.t('status.404.text')
        }
      case 418:
        return {
          message: "I'm a teapot",
          text: this.$i18n.t('status.418.text')
        }
      default:
        return {
          message: "An error occured",
          text: this.$i18n.t('status.default.text')
        }
      }
    }
  },
  head () {
    return {
      title: `${this.error.statusCode} ${this.status.message}`
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
