<script setup lang="ts">
import { h, reactive,resolveComponent as _resolveComponent,shallowRef } from "vue";
import { UlTable, type TableProps } from "@udesign-vue/components";

const ElDatePicker = shallowRef(_resolveComponent('el-date-picker'))
const ElInput = shallowRef(_resolveComponent('el-input'))
const ElSelect = shallowRef(_resolveComponent('el-select'))
const ElInputNumber = shallowRef(_resolveComponent('el-input-number'))

const config: TableProps = reactive({
  columns: [
    {
      label: "企业名称",
      prop: "CompanyName",
    },
    {
      label: "车牌号码",
      prop: "PlateNumber",
    },
    {
      label: "是否安装GPS",
      formatter: (row) => (row.HaveGps === "1" ? "有" : "没有"),
    },
  ],
  searchForms: [
    {
      label: "违规日期",
      id: "a",
      component: ElDatePicker,
      el: {
        type: "daterange",
      },
      span: 8,
    },
    {
      label: () =>
        h(
          "span",
          {
            style: {
              color: "red",
            },
          },
          "车牌号码"
        ),
      id: "b",
      component: ElInput,
      default: "苏州",
      el: {
        placeholder: "车牌号",
      },
      span: 8,
    },
    {
      id: "c",
      label: "车辆类型",
      component: ElSelect,
      options: [
        {
          label: "A",
          value: "A",
        },
      ],
      span: 8,
    },
    {
      id: "e",
      label: "清单类型",
      component: ElInputNumber,
      span: 8,
    },
    {
      id: "f",
      label: "处理状态",
      component: ElSelect,
    },
  ],
  forms: [
    {
      id: "PlateNumber",
      label: "车牌号码：",
      component: "input",
      rules: {
        required: true,
        message: "请输入车牌号码！",
        trigger: "change",
      },
    },
    {
      id: "HaveGps",
      label: "是否安装GPS：",
      component: "input",
    },
  ],
  getList() {
    return {
      list: [
        {
          CompanyName: "1",
        },
        {
          CompanyName: "2",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
        {
          CompanyName: "3",
        },
      ],
      total: 300,
    };
  },
});
</script>

<template>
  <ul-table v-bind="config" />
</template>
