<template>
  <el-menu :class="[ns.b()]" v-bind="props" :style="cssVar">
    <ul-menu-item v-for="menu in menus" :key="menu.id" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import { useNamespace } from "@udesign-vue/hooks";
import tinycolor from "tinycolor2";
import { menuProps } from "./menu";

const UlMenuItem = defineAsyncComponent(() => import("./menu-item.vue"));

defineOptions({ name: "ul-menu" });
const props = defineProps(menuProps);

const ns = useNamespace("menu");

const cssVar = computed(() => {
  const cssVar = {
    "--selected-bg-color": props.selectBgColor,
    "--menu-item-width": props.width,
  } as any;

  const bg = props.backgroundColor || "#ffffff";
  const color = tinycolor(bg);
  if (color.isDark()) {
    cssVar["--menu-item-hover-color"] = "#ffffff";
  }
  return cssVar;
});
</script>
