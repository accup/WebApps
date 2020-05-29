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
            :error="0 < bpmRangeMaxErrorNumber"
            :error-messages="[
              '',
              $t('pages.configure.invalids.beFilled'),
              $t('pages.configure.invalids.beLessThanOrEqual', [bpmRangeLimits.max]),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmRangeLimits.min]),
              $t('pages.configure.invalids.beGreaterThanOrEqual', [bpmRange.min]),
            ][bpmRangeMaxErrorNumber]"
            :label="$t('pages.configure.maximumOfBpm')"/>
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

      <v-card-text>{{ $t('info.title') }}{{ $t('symbols.parentheses', [$t('pages.configure.about.version') + $t('info.versionNumber')]) }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    console.log(this.$store.state);
    return {
      isConfigurationValid: true,
      bpmRange: {
        min: this.$store.state.configure.bpmRange.min,
        max: this.$store.state.configure.bpmRange.max
      },
      bpmStep: this.$store.state.configure.bpmStep,

      bpmRangeLimits: {
        min: 1,
        max: 360
      }
    }
  },
  computed: {
    isConfigurationModified () {
      return (
        this.bpmRange.min != this.$store.state.configure.bpmRange.min
        || this.bpmRange.max != this.$store.state.configure.bpmRange.max
        || this.bpmStep != this.$store.state.configure.bpmStep
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
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        // BPMの計測範囲をストア
        console.log(this.bpmRange);
        this.$store.commit('configure/setBpmRange', this.bpmRange);
        this.$store.commit('configure/setBpmStep', this.bpmStep);
      }
    },
    restore () {
      // restore data
      this.bpmRange.min = this.$store.state.configure.bpmRange.min;
      this.bpmRange.max = this.$store.state.configure.bpmRange.max;
      this.bpmStep = this.$store.state.configure.bpmStep;
    },

    beFilled (v) {
      return v !== '';
    },
    beGreaterThanOrEqual(v, le) {
      return le <= v;
    },
    beLessThanOrEqual(v, ge) {
      return v <= ge;
    },
  }
}
</script>

<style>

</style>
