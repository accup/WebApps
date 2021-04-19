<template>
  <transition name="page">
    <nuxt />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss">
body {
  background-color: #202024;
}

.page {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
