<template>
  <el-container class="page-container">
    <SideBar :collapse="isCollapse" />
    <el-container direction="vertical">
      <Heads :collapse.sync="isCollapse" />
      <Container />
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./components/SideBar/index.vue";
import Heads from "./components/Main/heads.vue";
import Container from "./components/Main/container.vue";
export default {
  name: "Layout",
  data() {
    return {
      isCollapse: false,
      keepAliveList: [],
    };
  },
  components: {
    SideBar,
    Heads,
    Container,
  },
};
</script>

<style scoped lang="scss">
.page-container {
  height: 100vh;
}
</style>
