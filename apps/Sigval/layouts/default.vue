<template>
  <v-app>
    <v-content>
      <transition name="page">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
}
</script>

<style lang="scss">
// Hide the vertical bar when body doesn't overflow.
html {
  overflow-y: auto !important;
}

// Fix the `v-bottom-navigation` and `v-btn`s issue on treeshake mode. (GitHub:vuetifyjs/vuetify #8067)
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}

.page {
  &-enter-active, &-leave-active {
    transition: opacity .5s;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}

</style>
