<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="path">
    <template #title>
      <el-icon>
        <Icon :icon="menu.meta.icon ?? 'ep:menu'" />
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <menu-item v-for="(child, id) in menu.children" :key="id" :menu="child" :parent="path" />
  </el-sub-menu>
  <el-menu-item v-else :index="path" :id="path">
    <el-icon>
      <Icon :icon="menu.meta.icon ?? 'ep:menu'" />
    </el-icon>
    <template #title>{{ menu.name }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { menuItemProps } from "./menu";

defineOptions({ name: "ul-menu-item" });
const props = defineProps(menuItemProps);
const path = computed(() => props.parent + props.menu.path);
</script>
