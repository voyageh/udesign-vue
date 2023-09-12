<template>
  <ul-table v-bind="config" />
  <el-button @click="onclick">添加筛选条件</el-button>
</template>

<script setup lang="tsx">
import { reactive, h } from "vue";
import { type TableProps } from "udesign-vue";

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
      formatter: (row) => (row.HaveGps == "1" ? "有" : "没有"),
    },
  ],
  searchForms: [
    {
      label: "违规日期",
      id: "a",
      component: "date",
      el: {
        type: "daterange",
      },
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
      component: "input",
      default: "苏州",
      el: {
        placeholder: "车牌号",
      },
    },
    {
      id: "c",
      label: "车辆类型",
      component: "select",
      options: [
        {
          label: "A",
          value: "A",
        },
      ],
    },
    {
      id: "e",
      label: "清单类型",
      component: "input-number",
    },
    {
      id: "f",
      label: "处理状态",
      component: "input",
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
  hasOperationColumn: false,
});

const onclick = async () => {
  config.searchForms?.push({
    label: "李四",
    component: "input",
  });
};
</script>
