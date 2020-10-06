<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="4">
        <number-field
          v-model.number="shapeLayer.outFeatures"
          @update="$emit('update')"
          :label="$t('shapeLayer.linear.outFeatures')"
          :min="1"
          be-integer
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Linear } from "~/modules/shape-layer";

export default {
  props: {
    shapeLayer: {
      type: Linear,
    },
  },
};
</script>