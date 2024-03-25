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
import { toString, tojson} from '../../util/filter';
const lotdata = [
    {
        id: "1",
        name: "lotnode1",
        bw: "222",
        max_battery_capacity: "2222",
        battery_sensing_rate: "2222",
        battery_sending_rate: "2222",
        ioTClassName: "444",
        mobilityEntity: "444",
        communicationProtocol: "444",
    },
]
const fogdata = [
    {
          id: "1",
          name: "222",
          bw: "222",
          max_battery_capacity: "2222",
          battery_sensing_rate: "2222",
          battery_sending_rate: "2222",
          ioTClassName: "444",
          mobilityEntity: "444",
          communicationProtocol: "444",
        },
]
const jobdata = [
    {
    id: 'job1',
    display: '123',
    timeone: '300s',
    schedule:'20s',
    success:'1448',
    error:'0',
    lastsuccess:'',
    lasterror:'12',
    status:'未开始',
    enabled:false,
    dateinfo:'这个是日志内容'
  }
]
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
        this.storagedata()
      }else{
        this.$message.error('账号或密码错误，请重新输入');
      }
    },
    storagedata(){
        // 存储lot表格数据
        const lot = tojson(localStorage.getItem("lotdata")) || lotdata
        localStorage.setItem('lotdata', toString(lot))
        // 存储fog表格数据
        const fog = tojson(localStorage.getItem("fogdata")) || fogdata
        localStorage.setItem('fogdata', toString(fog))
        // 存储job表格数据
        const job = tojson(localStorage.getItem("jobdata")) || jobdata
        localStorage.setItem('jobdata', toString(job))
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