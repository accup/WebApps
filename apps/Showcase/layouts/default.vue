<template>
  <main>
    <transition name="page">
      <nuxt />
    </transition>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
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
