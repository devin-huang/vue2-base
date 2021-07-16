<template>
  <section class="beadcrumb-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(item, key) in routes">
        <el-breadcrumb-item :key="key" :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </section>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {};
  },
  computed: {
    routes() {
      return this.$route.matched;
    },
  },
};
</script>

<style scoped lang="scss">
.beadcrumb-container {
  padding: 15px 0px;
  margin-top: -15px;
}
</style>
