<template>
  <main>
    {{ status.code }}
    -
    {{ status.message }}
    <hr />
    {{ status.text }}
    <hr />
    <nuxt-link :to="localePath('/')">
      {{ $t("layouts.error.MoveToCorrectPage") }}
    </nuxt-link>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    const code = this.error.statusCode;
    let message;
    let text;
    if (this.$i18n.te(`errors.${code}.message`)) {
      message = this.$i18n.t(`errors.${code}.message`);
    } else {
      message = this.$i18n.t(`errors.default.message`);
    }
    if (this.$i18n.te(`errors.${code}.text`)) {
      text = this.$i18n.t(`errors.${code}.text`);
    } else {
      text = this.$i18n.t(`errors.default.text`);
    }

    return {
      status: {
        code,
        message,
        text,
      },
    };
  },
  head() {
    return {
      title: `${this.status.code} - ${this.status.message}`,
    };
  },
};
</script>
