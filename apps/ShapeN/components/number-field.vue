<template>
  <v-text-field
    :value="tempValue"
    @input="onInput($event)"
    type="number"
    :label="label"
    :error="errorMessage != ''"
    :error-messages="errorMessage"
    :hide-details="errorMessage == ''"
    outlined
    dense
    @keyup.enter="$event.target.blur()"
    @blur="onBlur"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    beInteger: {
      type: Boolean,
      default: false,
    },
    blurOnly: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      validatedValue: this.$props.value,
      tempValue: this.$props.value,
      errorMessage: "",
    };
  },
  methods: {
    validate(value) {
      if (Number.isNaN(value)) {
        return this.$i18n.t("invalids.beFilled");
      } else if (this.beInteger && !Number.isInteger(value)) {
        return this.$i18n.t("invalids.beInteger");
      } else if (this.min != null && this.min > value) {
        return this.$i18n.t("invalids.beGreaterThanOrEqual", [this.min]);
      } else if (this.max != null && this.max < value) {
        return this.$i18n.t("invalids.beLessThanOrEqual", [this.max]);
      } else {
        return "";
      }
    },
    onInput(eventValue) {
      const value = Number.parseFloat(eventValue);
      this.tempValue = Number.isNaN(value) ? "" : value;

      this.errorMessage = this.validate(value);

      if (this.errorMessage == "") {
        this.validatedValue = value;
        if (!this.blurOnly) {
          this.$emit("input", this.validatedValue);
          this.$emit("update");
        }
      }
    },
    onBlur() {
      if (this.blurOnly) {
        this.$emit("input", this.validatedValue);
      }
      this.tempValue = this.validatedValue;
      this.errorMessage = this.validate(this.tempValue);
    },
  },
};
</script>