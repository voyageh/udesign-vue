import { inject, nextTick, ref } from "vue";
import { get as _get } from "lodash-es";
import { saveAs } from "file-saver";

import type { FormInstance } from "@udesign-vue/components/form";
import type { TableProps, GlobalConfig } from "./table";

// 数据路径默认配置
const defaultPathConfig: GlobalConfig = {
  listPath: "list",
  totalPath: "total",
  pageKey: "pageNo",
  sizeKey: "pageSize",
  background: true,
  small: true,
};

// 分页默认值
const initPaging = (page: string, size: string) => ({ [page]: 1, [size]: 10 });

export default function useTable(props: TableProps) {
  const { pagingConfig, dataPath, hasPaging, getList, onNew, getDetail, onEdit, onView, onDelete, save, exportFn } =
    props;

  const globalConfig = inject<GlobalConfig>("table", defaultPathConfig);
  const { listPath, totalPath, pageKey, sizeKey, ...rest } = Object.assign({}, defaultPathConfig, globalConfig, {
    ...pagingConfig,
    ...dataPath,
  });

  const searchFormRef = ref<FormInstance>();
  const paging = ref(initPaging(pageKey, sizeKey));
  const loading = ref(false);
  const list = ref([]);
  const total = ref(0);

  const onSearch = async () => {
    if (!getList) return;
    loading.value = true;
    const params = searchFormRef.value?.getFormValue() || {};
    hasPaging && Object.assign(params, paging.value);
    const rsp = await getList(params);
    list.value = _get(rsp, listPath);
    total.value = _get(rsp, totalPath);
    loading.value = false;
  };

  const onRefresh = () => {
    searchFormRef.value?.resetFields()?.();
    paging.value = initPaging(pageKey, sizeKey);
    onSearch();
  };

  const exportFile = async () => {
    if (!exportFn) return;
    const params = searchFormRef.value?.getFormValue() || {};
    const { data, headers } = await exportFn(params);

    const temp = headers["content-disposition"];
    const filename = decodeURIComponent(temp.match(/filename\*=UTF-8''([^;]+)/)[1]);
    if (filename) {
      saveAs(data, filename);
    }
  };

  // 新增、修改、删除、查看明细
  const dialogVisible = ref(false);
  const title = ref("");
  const type = ref("");
  const formRef = ref<FormInstance>();

  const onDefaultNew = () => {
    if (onNew) {
      onNew();
      return;
    }
    title.value = "新增";
    type.value = "new";
    dialogVisible.value = true;
  };

  const setDetail = async (row: any) => {
    let detail = row;
    if (getDetail) {
      detail = await getDetail(row);
    }
    nextTick(() => {
      formRef.value?.updateForm(detail);
    });
  };

  const onDefaultEdit = (row: any) => {
    if (onEdit) {
      onEdit(row);
      return;
    }
    title.value = "编辑";
    type.value = "edit";
    dialogVisible.value = true;
    setDetail(row);
  };

  const onDefaultView = async (row: any) => {
    if (onView) {
      onView(row);
      return;
    }
    title.value = "查看";
    type.value = "view";
    dialogVisible.value = true;
    setDetail(row);
  };

  const onDefaultDelete = async (row: any) => {
    if (!onDelete) return;
    if ((await onDelete(row)) !== false) {
      onSearch();
    }
  };

  const onSave = async () => {
    await formRef.value?.validate()?.(async (valid) => {
      if (!valid || !save) return;
      const params = formRef.value?.getFormValue();
      // true 或者 undefined 表示成功
      if ((await save(params, type.value)) !== false) {
        dialogVisible.value = false;
        onSearch();
      }
    });
  };

  const onCancel = () => {
    formRef.value?.resetFields()?.();
  };

  return {
    searchFormRef,
    pageKey,
    sizeKey,
    pagingConfig: rest,
    paging,
    loading,
    list,
    total,
    onSearch,
    onRefresh,
    exportFile,
    dialogVisible,
    title,
    type,
    formRef,
    onDefaultNew,
    onDefaultEdit,
    onDefaultView,
    onDefaultDelete,
    onSave,
    onCancel,
  };
}
