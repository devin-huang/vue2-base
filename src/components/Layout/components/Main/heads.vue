<template>
  <el-header>
    <div class="header-left">
      <el-button
        class="font16"
        :icon="collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="$emit('update:collapse', !collapse)"
      >
      </el-button>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting font16" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="view">查看</el-dropdown-item>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>用户名称</span>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Heads",
  data() {
    return {};
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.handleLogout();
          break;
        case "view":
          break;
      }
    },
    handleLogout() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
// HEADER
.el-header {
  background-color: #e9f1fa;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
}
</style>
