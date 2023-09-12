<template>
  <div :class="[ns.b()]">
    <component :is="component" v-model="value[minKey]"></component>
    <span>-</span>
    <component :is="component" v-model="value[maxKey]"></component>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace, useVModel } from "@udesign-vue/hooks";
import { rangeProps } from "./range";

defineOptions({ name: "ul-range" });

const props = defineProps(rangeProps);
const emit = defineEmits(["update:modelValue"]);
const ns = useNamespace("range");

const value = useVModel(props, "modelValue", emit);
</script>
