<template>
  <v-app>
    <v-app-bar flat app>
      <v-toolbar-title>{{ $t("info.appName") }}</v-toolbar-title>
    </v-app-bar>
    <v-main app>
      <v-container>
        <v-row align="center" justify="center" dense>
          <template v-for="(size, index) in inputShape">
            <v-col
              cols="auto"
              v-if="index != 0"
              class="text-center"
              :key="2 * index"
            >
              <span>×</span>
            </v-col>
            <v-col cols="auto" :key="2 * index + 1">
              <number-field
                v-model.number="inputShape[index]"
                @update="evaluateShape()"
                :label="
                  0 < layers.length
                    ? layers[0].instance.getShapeLabel(inputShape.length, index)
                    : ''
                "
                class="shape-item"
                style="width: 80px"
              />
            </v-col>
          </template>
          <v-col cols="auto" class="text-left">
            <v-btn icon color="green" @click="pushSize" small>
              <v-icon>{{ icons.mdiPlusCircle }}</v-icon>
            </v-btn>
            <v-btn icon color="green" @click="popSize" small>
              <v-icon>{{ icons.mdiMinusCircle }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <transition-group name="layers" tag="div">
          <v-row v-for="(layer, index) in layers" :key="layer.id" dense>
            <v-col cols="12">
              <v-card color="transparent" flat>
                <v-row align="center" justify="center" dense>
                  <v-col cols="3" />
                  <v-col cols="auto" class="text-center" style="width: 80px">
                    <v-icon>{{ icons.mdiArrowDown }}</v-icon>
                  </v-col>
                  <v-col cols="3" class="text-left">
                    <v-row>
                      <v-btn @click="insertShapeLayer(index)" color="blue" icon>
                        <v-icon>{{ icons.mdiPlusCircle }}</v-icon>
                      </v-btn>
                      <v-btn @click="removeShapeLayer(index)" color="red" icon>
                        <v-icon>{{ icons.mdiMinusCircle }}</v-icon>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-card outlined>
                <v-select
                  v-model="layer.name"
                  :items="modules"
                  filled
                  hide-details
                  dense
                  @input="selectShapeLayer(index)"
                />
                <component
                  :is="layer.component"
                  :shape-layer="layer.instance"
                  @update="evaluateShape(index)"
                />
              </v-card>
              <v-card color="transparent" flat>
                <v-row align="center" justify="center" dense>
                  <v-col cols="auto" class="text-center" style="width: 80px">
                    <v-icon>{{ icons.mdiArrowDown }}</v-icon>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-if="layer.result.invalid" flat>
                <v-row justify="center" dense>
                  <v-col cols="auto" class="text-center">
                    <span class="error--text">{{
                      $t(layer.result.errorMessage)
                    }}</span>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-else color="transparent" flat>
                <v-row align="center" justify="center" dense>
                  <template v-for="(size, sizeIndex) in layer.result.shape">
                    <v-col
                      cols="auto"
                      v-if="sizeIndex != 0"
                      :key="sizeIndex * 2"
                    >
                      <span>×</span>
                    </v-col>
                    <v-col cols="auto" :key="sizeIndex * 2 + 1">
                      <readonly-number-field
                        :value="layer.result.shape[sizeIndex]"
                        :label="
                          index + 1 < layers.length
                            ? layers[index + 1].instance.getShapeLabel(
                                layer.result.shape.length,
                                sizeIndex
                              )
                            : ''
                        "
                        style="width: 80px"
                      />
                    </v-col>
                  </template>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </transition-group>
        <v-row justify="center" dense>
          <v-col cols="auto">
            <v-btn @click="insertShapeLayer(layers.length)" color="blue" icon>
              <v-icon>{{ icons.mdiPlusCircle }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mdiArrowDown, mdiPlusCircle, mdiMinusCircle } from "@mdi/js";
import * as sl from "~/modules/shape-layer";

const shapeLayers = {
  Linear: {
    class: sl.Linear,
    component: require("~/components/shape-layer/Linear").default,
  },
  Conv1d: {
    class: sl.Conv1d,
    component: require("~/components/shape-layer/ConvOned").default,
  },
  Conv2d: {
    class: sl.Conv2d,
    component: require("~/components/shape-layer/ConvTwod").default,
  },
  Conv3d: {
    class: sl.Conv3d,
    component: require("~/components/shape-layer/ConvThreed").default,
  },
  ConvTranspose1d: {
    class: sl.ConvTranspose1d,
    component: require("~/components/shape-layer/ConvTransposeOned").default,
  },
  ConvTranspose2d: {
    class: sl.ConvTranspose2d,
    component: require("~/components/shape-layer/ConvTransposeTwod").default,
  },
  ConvTranspose3d: {
    class: sl.ConvTranspose3d,
    component: require("~/components/shape-layer/ConvTransposeThreed").default,
  },
};
const idStack = [];
let nextId = 0;

function getId() {
  if (idStack.length == 0) {
    return nextId++;
  } else {
    return idStack.pop();
  }
}
function returnId(id) {
  idStack.push(id);
}

export default {
  data() {
    return {
      modules: [
        { text: "Linear", value: "Linear" },
        { text: "Conv1d", value: "Conv1d" },
        { text: "Conv2d", value: "Conv2d" },
        { text: "Conv3d", value: "Conv3d" },
        { text: "ConvTranspose1d", value: "ConvTranspose1d" },
        { text: "ConvTranspose2d", value: "ConvTranspose2d" },
        { text: "ConvTranspose3d", value: "ConvTranspose3d" },
      ],
      inputShape: [128, 1, 1],
      layers: [],
      icons: {
        mdiArrowDown,
        mdiPlusCircle,
        mdiMinusCircle,
      },
    };
  },
  methods: {
    log: console.log,
    pushSize() {
      this.inputShape.push(1);
      this.evaluateShape();
    },
    popSize() {
      if (this.inputShape.length == 0) return;
      this.inputShape.pop();
      this.evaluateShape();
    },
    insertShapeLayer(index) {
      const newShapeLayer = shapeLayers[this.modules[0].value];

      this.layers.splice(index, 0, {
        id: getId(),
        name: this.modules[0].value,
        instance: new newShapeLayer.class(),
        component: newShapeLayer.component,
        result: {
          errorMessage: "shapeLayer.invalids.nullShape",
          invalid: true,
        },
      });
      this.evaluateShape(index);
    },
    removeShapeLayer(index) {
      const [layer] = this.layers.splice(index, 1);
      returnId(layer.id);
      this.evaluateShape(index);
    },
    selectShapeLayer(index) {
      const layer = this.layers[index];
      const newShapeLayer = shapeLayers[layer.name];

      layer.instance = new newShapeLayer.class();
      layer.component = newShapeLayer.component;

      this.evaluateShape(index);
    },
    evaluateShape(start_index = 0) {
      let shape =
        start_index == 0
          ? this.inputShape
          : this.layers[start_index - 1].result.shape;

      for (let index = start_index; index < this.layers.length; ++index) {
        const layer = this.layers[index];
        if (shape == null) {
          layer.result = {
            errorMessage: "shapeLayer.invalids.nullShape",
            invalid: true,
          };
        } else {
          let result = layer.instance.forwardShape(shape);

          if (typeof result == "string") {
            layer.result = {
              shape: null,
              errorMessage: result,
              invalid: true,
            };
          } else {
            layer.result = {
              shape: result,
              errorMessage: null,
              invalid: false,
            };
          }
          shape = layer.result.shape;
        }
      }
    },
  },
  mounted() {
    this.insertShapeLayer(0);
    this.evaluateShape();
  },
};
</script>

<style lang="scss">
.layers {
  &-enter {
    &-active {
      transition: opacity 0.3s ease-in-out;
    }
    &,
    &-from {
      opacity: 0;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    &-active {
      height: 0;
      transition: opacity 0.3s ease-in-out;
    }
    &,
    &-from {
      opacity: 1;
    }
    &-to {
      opacity: 0;
    }
  }
  &-move {
    transition: transform 0.5s ease-out;
  }
}
</style>