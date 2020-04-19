<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols=12 sm=8>
        <v-card>
          <v-card-title>
            {{ status.code }}
            -
            {{ status.message }}
          </v-card-title>
          <v-divider/>
          <v-card-text>
            {{ status.text }}
          </v-card-text>
          <v-card-text>
            {{ $t("layouts.error.MoveToCorrectPage") }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
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
        text
      }
    }
  },
  head () {
    return {
      title: `${this.status.code} - ${this.status.message}`
    }
  }
}
</script>
