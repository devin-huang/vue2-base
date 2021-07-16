<template>
  <div>
    <el-button type="primary" @click="handleClick">
      仅用于baseForm测试
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  methods: {
    handleClick() {
      this.$emit("pick", "test");
    },
  },
};
</script>

<style></style>
