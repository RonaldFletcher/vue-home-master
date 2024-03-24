<template>
  <div class="form">
    <div style="margin-bottom: 50px;" class="login-title">雾计算调度平台</div>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  // 雾计算调度平台
  name: "login",
  components: {  },
  data() {
    return {
      ruleForm: {
          pass: '',
          checkPass: '',
        },
    };
  },

  computed: {},

  mounted() {},

  methods: {
    submitForm(){
      const { pass, checkPass } = this.ruleForm
      if(!pass || !checkPass) {
        this.$message.error('账号或密码不能为空！');
      }

      if(pass === 'admin' && checkPass === 'admin'){
        this.$router.push({ path: `/home/dashboard`});
      }else{
        this.$message.error('账号或密码错误，请重新输入');
      }
    }
  },
};
</script>
  <style lang='scss' scoped>
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-15%);
    .login-title {
      font-size: 30px;
      font-weight: bold
    }
    .el-form {
      width: 35%;
    }
    .el-form-item__content {
      text-align: center;
      .el-button {
        width: 100%;
      }
    }
  }
</style>