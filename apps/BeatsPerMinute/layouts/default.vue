<template>
  <v-app>
    <v-content>
      <transition name="page">
        <nuxt />
      </transition>
    </v-content>
    <v-bottom-navigation
      app shift grow
      color="blue lighten-2"
      background-color="transparent"
      >
      <v-btn nuxt :to="localePath('/')">
        <span>BPM</span>
        <v-icon>{{ icons.iconBpm }}</v-icon>
      </v-btn>
      <v-btn nuxt :to="localePath('/configure')">
        <span>CONFIG</span>
        <v-icon>{{ icons.mdiCog }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mdiHome, mdiCog, mdiInformation } from '@mdi/js';
import { iconBpm } from '@/modules/icons';


export default {
  data: () => ({
    icons: {
      mdiHome,
      mdiCog,
      mdiInformation,
      iconBpm,
    }
  })
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
