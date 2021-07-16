<template>
  <section class="tfw-form">
    <el-form
      ref="formRef"
      label-position="right"
      label-width="80px"
      :rules="rules"
      :model="formLabelAlign"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formLabelAlign: {
        username: "",
        region: "",
        type: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["formRef"].resetFields();
    },
  },
  // VUE 3.X 方式验证FORM与路由跳转
  // setup() {
  //   // 生命周期
  //   onMounted(() => {
  //     console.log("Component is mounted!");
  //   });

  //   // 定义常量
  //   const router = useRouter();
  //   const formRef = ref(null);

  //   // 定义变量
  //   const rules = {
  //     username: [
  //       { required: true, message: "请输入用户名", trigger: "change" },
  //       {
  //         min: 5,
  //         max: 20,
  //         message: "长度在 5 到 20 个字符",
  //         trigger: "change",
  //       },
  //     ],
  //     password: [{ required: true, message: "请输入密码", trigger: "change" }],
  //   };

  //   // 方法
  //   const submitForm = async () => {
  //     if (formRef.value) {
  //       try {
  //         await formRef.value.validate();
  //         this.$message({
  //           type: "success",
  //           message: "成功",
  //           onClose: () => {
  //             router.push({ path: "/index" });
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   const resetForm = () => {
  //     formRef.value.resetFields();
  //   };

  //   return {
  //     rules,
  //     formRef,
  //     submitForm,
  //     resetForm,
  //   };
  // },
};
</script>

<style scoped>
.tfw-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.tfw-form .el-form {
  width: 400px;
}
</style>
