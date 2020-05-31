<template>
  <v-container
    pa-0
    >
    <v-card
      flat tile
      >
      <v-card-title>{{ $t('pages.configure.title') }}</v-card-title>

      <v-container>
        <v-form ref="form" v-model="isConfigurationValid">
          <p>{{ $t('pages.configure.bpmRange') }}{{ $t('pages.configure.bpmRangeDescription', [bpmRangeLimits.min, bpmRangeLimits.max]) }}</p>
          <v-text-field
            v-model.number="bpmRange.min"
            type="number"
            :min="bpmRangeLimits.min" :max="bpmRangeLimits.max"
            :error="0 < bpmRangeMinErrorNumber"
            :error-messages="[
              '',
              $t('pages.configure.invalids.beFilled'),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmRangeLimits.min]),
              $t('pages.configure.invalids.beLessThanOrEqual', [bpmRangeLimits.max]),
              $t('pages.configure.invalids.beLessThanOrEqual', [bpmRange.max]),
            ][bpmRangeMinErrorNumber]"
            :label="$t('pages.configure.minimumOfBpm')"/>
          <v-text-field
            v-model.number="bpmRange.max"
            type="number"
            :min="bpmRangeLimits.min" :max="bpmRangeLimits.max"
            :error="0 < bpmRangeMaxErrorNumber"
            :error-messages="[
              '',
              $t('pages.configure.invalids.beFilled'),
              $t('pages.configure.invalids.beLessThanOrEqual', [bpmRangeLimits.max]),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmRangeLimits.min]),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmRange.min]),
            ][bpmRangeMaxErrorNumber]"
            :label="$t('pages.configure.maximumOfBpm')"/>

          <p>{{ $t('pages.configure.bpmPrecision') }}{{ $t('pages.configure.bpmPrecisionDescription', [bpmPrecisionLimits.min, bpmPrecisionLimits.max]) }}</p>
          <v-text-field
            v-model.number="bpmPrecision"
            type="number"
            :min="bpmPrecisionLimits.min" :max="bpmPrecisionLimits.max"
            :error="0 < bpmPrecisionErrorNumber"
            :error-messages="[
              '',
              $t('pages.configure.invalids.beFilled'),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmPrecisionLimits.min]),
              $t('pages.configure.invalids.beLessThanOrEqual', [bpmPrecisionLimits.max]),
              $t('pages.configure.invalids.beInteger'),
            ][bpmPrecisionErrorNumber]"
            :label="$t('pages.configure.bpmDecimalDigits')"/>
          <v-btn
            :disabled="!isConfigurationValid || !isConfigurationModified"
            @click="save"
            depressed
            color="primary"
            >{{ $t('pages.configure.save') }}</v-btn>
          <v-btn
            :disabled="!isConfigurationModified"
            @click="restore"
            depressed
            >{{ $t('pages.configure.restore') }}</v-btn>
        </v-form>
      </v-container>

      <v-card-text>{{ $t('info.title') }}{{ $t('symbols.parentheses', [$t('pages.configure.about.version') + `${version.major}.${version.minor}.${version.patch}`]) }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      version: this.$store.state.version,

      isConfigurationValid: true,
      bpmRange: {
        min: this.$store.state.configure.bpmRange.min,
        max: this.$store.state.configure.bpmRange.max
      },
      bpmPrecision: this.$store.state.configure.bpmPrecision,

      bpmRangeLimits: {
        min: 1,
        max: 360
      },
      bpmPrecisionLimits: {
        min: 0,
        max: 2
      }
    }
  },
  computed: {
    isConfigurationModified () {
      return (
        this.bpmRange.min != this.$store.state.configure.bpmRange.min
        || this.bpmRange.max != this.$store.state.configure.bpmRange.max
        || this.bpmPrecision != this.$store.state.configure.bpmPrecision
      );
    },

    bpmRangeMinErrorNumber () {
      if (this.bpmRange.min === '') {
        return 1;
      } else if (this.bpmRange.min < this.bpmRangeLimits.min) {
        return 2;
      } else if (this.bpmRangeLimits.max < this.bpmRange.min) {
        return 3;
      } else if (this.bpmRange.max < this.bpmRange.min) {
        return 4;
      }
      return 0;
    },
    bpmRangeMaxErrorNumber () {
      if (this.bpmRange.max === '') {
        return 1;
      } else if (this.bpmRangeLimits.max < this.bpmRange.max) {
        return 2;
      } else if (this.bpmRange.max < this.bpmRangeLimits.min) {
        return 3;
      } else if (this.bpmRange.max < this.bpmRange.min) {
        return 4;
      }
      return 0;
    },
    bpmPrecisionErrorNumber () {
      if (this.bpmPrecision === '') {
        return 1;
      } else if (this.bpmPrecision < this.bpmPrecisionLimits.min) {
        return 2;
      } else if (this.bpmPrecisionLimits.max < this.bpmPrecision) {
        return 3;
      } else if (!Number.isInteger(this.bpmPrecision)) {
        return 4;
      }
      return 0;
    },
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        // BPMの計測範囲をストア
        this.$store.commit('configure/setBpmRange', this.bpmRange);
        this.$store.commit('configure/setBpmPrecision', this.bpmPrecision);
      }
    },
    restore () {
      // restore data
      this.bpmRange.min = this.$store.state.configure.bpmRange.min;
      this.bpmRange.max = this.$store.state.configure.bpmRange.max;
      this.bpmPrecision = this.$store.state.configure.bpmPrecision;
    },
  }
}
</script>

<style>

</style>
