<template>
  <ul-menu
    :menus="menus"
    background-color="#2b303b"
    text-color="#bfcbd9"
    active-text-color="#ffffff"
    select-bg-color="#597ef7" />
</template>

<script setup lang="ts">
const menus = [
  {
    id: "jhbbffh-1",
    name: "表格",
    path: "/table",
    meta: {
      icon: "fluent-mdl2:system",
    },
    children: [
      {
        id: "jhbbffh-1-1",
        name: "基础表格",
        path: "/table",
        meta: {
          icon: "grommet-icons:host-maintenance",
        },
      },
    ],
  },
];
</script>

<style scoped></style>
