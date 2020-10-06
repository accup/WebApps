<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="4">
        <number-field
          v-model.number="shapeLayer.outChannels"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.outChannels')"
          :min="1"
          be-integer
        />
      </v-col>
      <v-col cols="0" sm="8" />
      <v-col cols="12" sm="2">
        <number-field
          v-model.number="shapeLayer.kernelSize[0]"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.kernelSize', ['X'])"
          :min="1"
          be-integer
        />
      </v-col>
      <v-col cols="12" sm="2">
        <number-field
          v-model.number="shapeLayer.stride[0]"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.stride', ['X'])"
          :min="1"
          be-integer
        />
      </v-col>
      <v-col cols="12" sm="2">
        <number-field
          v-model.number="shapeLayer.padding[0]"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.padding', ['X'])"
          :min="0"
          be-integer
        />
      </v-col>
      <v-col cols="12" sm="2">
        <number-field
          v-model.number="shapeLayer.outputPadding[0]"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.outputPadding', ['X'])"
          :min="0"
          be-integer
        />
      </v-col>
      <v-col cols="12" sm="2">
        <number-field
          v-model.number="shapeLayer.dilation[0]"
          @update="$emit('update')"
          :label="$t('shapeLayer.conv.dilation', ['X'])"
          :min="1"
          be-integer
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ConvTranspose1d } from "~/modules/shape-layer";

export default {
  props: {
    shapeLayer: {
      type: ConvTranspose1d,
    },
  },
};
</script>