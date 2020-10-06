<template>
  <v-text-field
    :value="value"
    :label="label"
    readonly
    hide-details
    dense
    @keyup.enter="$event.target.blur()"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>
