<template>
  <el-main>
    <Breadcrumb />
    <keep-alive :include="keepAliveList">
      <router-view />
    </keep-alive>
  </el-main>
</template>

<script>
import baseLayout from "@/helpers/keepAlive/baseLayout";
import Breadcrumb from "./breadcrumb.vue";
export default baseLayout({
  name: "Container",
  components: { Breadcrumb },
  data() {
    return {
      keepAliveList: [],
    };
  },
});
</script>

<style scoped lang="scss">
// Main
.el-main {
  padding: 15px;
}
</style>
