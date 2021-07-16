<template>
  <section>
    <div class="p-lg bd-btm">
      <h4>基础搜索栏</h4>
      <BaseSearchBar :items="searchItems" />
    </div>
    <div class="p-lg bd-btm">
      <h4>基础表单</h4>
      <BaseForm :form="forms" />
    </div>
    <div class="p-lg bd-btm">
      <h4>基础表格</h4>
      <BaseTable
        :columns="columns"
        :page="page"
        :data="tableData"
        @pageChange="onPageChange"
      />
    </div>
    <div class="p-lg bd-btm">
      <h4>弹框</h4>
      <el-button @click="showAsyncDemoCom">异步加载组件</el-button>
      <el-button @click="showDemoCom">常规加载组件</el-button>
    </div>
  </section>
</template>

<script>
import { columns } from "./columns.js";
import { searchItems } from "./searchItems.js";
import { forms } from "./formItems.js";
// getNodeVm用于基础组件的数据对象内获取当前this
import { getNodeVm } from "@/utils/vm";
import BaseForm from "@/components/baseForm";
import BaseSearchBar from "@/components/baseSearchBar";
import basePage from "@/helpers/keepAlive/basePage";
import { common } from "@/server/index";
import { showDialog } from "@/components/baseDialog/index";
import { asyncDemoCom } from "@/components/baseDialog/asyncComponents";
import Demo from "@/components/baseDialog/demo";

export default basePage({
  name: "Index",
  keepAlive: true,
  components: { BaseForm, BaseSearchBar, Demo },
  async created() {
    getNodeVm(this);
    common.login({
      Operator: "cj01",
      PassWord: "7c4a8d09ca3762af61e59520943dc26494f8941b",
      _xsrf: "bZJc2sWbQLKos6GkHn/VB9otfwt8S0R0kRvJ5/xJ89E=",
    });

    common.logout({
      Operator: "cj01",
      _xsrf: "bZJc2sWbQLKos6GkHn/VB9otfwt8S0R0kRvJ5/xJ89E=",
    });
  },
  data() {
    return {
      searchItems,
      columns,
      forms: forms,
      tableData: [{ application_no: 1 }, { application_no: 2 }],
      page: { total: 0, pageSize: 10, currentPage: 1 },
    };
  },
  methods: {
    onPageChange() {},
    showAsyncDemoCom() {
      asyncDemoCom();
    },
    showDemoCom() {
      showDialog({
        title: "弹出框标题",
        width: "800px",
        component: <Demo />,
      });
    },
  },
});
</script>

<style></style>
