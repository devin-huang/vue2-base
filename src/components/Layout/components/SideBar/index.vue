<template>
  <el-aside class="menu-container" :class="{ collapse: collapse }">
    <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 100%">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
      >
        <SideBarItem :routers="routes"></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import SideBarItem from "./SideBarItem.vue";
export default {
  name: "Menu",
  props: {
    collapse: Boolean,
  },
  components: {
    SideBarItem,
  },
  computed: {
    routes() {
      const {
        options: { routes },
      } = this.$router;
      return routes.filter((item) => !item.hidden);
    },
  },
  created() {
    console.log(this.$router);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="scss">
// MENU
.menu-container {
  width: auto !important;
  background: #545c64;
}

.el-menu {
  height: 100%;
  transition: width 0.5s;
  -webkit-transition: width 0.5s;
  width: 230px !important;
  border: thin solid #545c64;
}
.collapse {
  .el-menu {
    height: 100%;
    transition: width 0.5s;
    -webkit-transition: width 0.5s;
    width: 65px !important;
  }
}
</style>
