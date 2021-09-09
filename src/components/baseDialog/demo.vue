<template>
  <div>
    <span>这是一段信息</span>
    <div>
      <!-- $emit:执行当前组件实例得 close 方法 -->
      <el-button @click="$emit('close')">取 消</el-button>
      <!-- $emit:执行当前组件实例得 submit 方法 -->
      <el-button type="primary" @click="$emit('submit')">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
};
</script>

<style></style>
