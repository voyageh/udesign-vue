<template>
  <div :class="[ns.b()]">
    <div :class="[ns.m('search')]">
      <ul-form ref="searchFormRef" :content="searchForms" inline>
        <el-button type="primary" @click="onSearch">
            <template #icon>
              <Icon icon="ep:search" />
            </template>
            查询
          </el-button>
          <el-button @click="onRefresh">
            <template #icon>
              <Icon icon="ep:refresh" />
            </template>
            重置
          </el-button>
      </ul-form>
    </div>
    <div :class="[ns.m('main')]">
      <div v-if="hasOperation" :class="[ns.m('header')]">
        <el-button v-if="hasNew" type="primary" @click="onDefaultNew">
          <template #icon>
            <Icon icon="mdi:add-bold" />
          </template>
          {{ newText }}
        </el-button>
        <el-button v-if="exportFn" type="success" @click="exportFile">
          <template #icon>
            <Icon icon="entypo:export" />
          </template>
          导出
        </el-button>
      </div>
      <el-table
        ref="table"
        border
        :data="list"
        v-bind="getElTableProps($props)"
        v-loading="loading"
        element-loading-text="正在努力加载...">
        <template v-for="item in columns">
          <slot :name="`id:${item.prop}`" />
          <el-table-column v-bind="item" />
          <slot :name="`$id:${item.prop}`" />
        </template>
        <el-table-column
          v-if="hasOperationColumn && columns.length > 0"
          :width="columnWidth"
          label="操作"
          align="center"
          fixed="right">
          <template #default="{ row, $index }">
            <el-button v-if="hasView" link type="primary" @click="onDefaultView(row)">{{ viewText }}</el-button>
            <el-button v-if="hasEdit" link type="primary" @click="onDefaultEdit(row)">{{ editText }}</el-button>
            <el-popconfirm
              v-if="hasDelete"
              :title="`确定要${deleteText}该数据吗?`"
              confirm-button-type="danger"
              :confirm-button-text="deleteText"
              @confirm="onDefaultDelete(row)">
              <template #reference>
                <el-button link type="danger">{{ deleteText }}</el-button>
              </template>
            </el-popconfirm>
            <slot name="extraOp" :row="row" :$index="$index"></slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="hasPaging"
        :class="[ns.m('paging')]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="pagingConfig"
        v-model:current-page="paging[pageKey]"
        v-model:page-size="paging[sizeKey]"
        :total="total"
        @size-change="onSearch"
        @current-change="onSearch" />
    </div>
    <el-dialog v-model="dialogVisible" :title="title" @close="onCancel">
      <ul-form ref="formRef" :content="forms" label-width="auto" />
      <template v-if="type !== 'view'" #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSave"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNamespace } from "@udesign-vue/hooks";
import { Icon } from "@iconify/vue";
import { UlForm } from "@udesign-vue/components/form";
import { tableProps, elTableProps } from "./table";
import useTable from "./use-table";

defineOptions({ name: "ul-table" });
const props = defineProps(tableProps);
const ns = useNamespace("table");

const getElTableProps = (obj: Record<string, any>) => {
  const t: Record<string, any> = {};
  Object.keys(elTableProps).forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      t[key] = obj[key];
    }
    return t;
  });
};

const {
  searchFormRef,
  pageKey,
  sizeKey,
  pagingConfig,
  paging,
  loading,
  list,
  total,
  onSearch,
  onRefresh,
  exportFile,
  type,
  dialogVisible,
  title,
  formRef,
  onDefaultNew,
  onDefaultView,
  onDefaultEdit,
  onDefaultDelete,
  onSave,
  onCancel,
} = useTable(props);

onMounted(() => {
  onSearch();
});

defineExpose({
  searchFormRef,
  onSearch,
  onRefresh,
});
</script>
