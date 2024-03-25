<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="id" prop="id">
        <el-input :disabled="flag" placeholder="id" v-model="ruleForm.id" />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input :disabled="flag" placeholder="name" v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="bw" prop="bw">
        <el-input placeholder="bw" v-model="ruleForm.bw" />
      </el-form-item>
      <el-form-item label="max_battery_capacity" prop="max_battery_capacity">
        <el-input
          placeholder="max_battery_capacity"
          v-model="ruleForm.max_battery_capacity"
        />
      </el-form-item>
      <el-form-item label="battery_sensing_rate" prop="battery_sensing_rate">
        <el-input
          placeholder="battery_sensing_rate"
          v-model="ruleForm.battery_sensing_rate"
        />
      </el-form-item>
      <el-form-item label="battery_sending_rate" prop="battery_sending_rate">
        <el-input
          placeholder="battery_sending_rate"
          v-model="ruleForm.battery_sending_rate"
        />
      </el-form-item>
      <el-form-item label="ioTClassName" prop="ioTClassName">
        <el-input placeholder="ioTClassName" v-model="ruleForm.ioTClassName" />
      </el-form-item>
      <el-form-item label="communicationProtocol" prop="communicationProtocol">
        <el-input
          placeholder="communicationProtocol"
          v-model="ruleForm.communicationProtocol"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    
  <script>
import { toString, tojson } from "../../../util/filter.js";

export default {
  components: {},
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        bw: "",
        max_battery_capacity: "",
        battery_sensing_rate: "",
        battery_sending_rate: "",
        ioTClassName: "",
        mobilityEntity: "",
        communicationProtocol: "",
      },
      rules: {
        id: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      flag: false,
    };
  },

  computed: {},

  mounted() {
    this.initdata = tojson(localStorage.getItem("fogdata"));
    const query = this.$route.query;
    if (!query.status) return;
    const { status } = query;
    this.ruleForm = status;
    this.flag = status || false;
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            // 如果是编辑 flag为true
            if(this.flag){
               const data = this.initdata.map(item=>{
                    if(item.id === this.ruleForm.id) {
                        return this.ruleForm
                    }
                    return item
               })
               localStorage.setItem("fogdata", toString(data));
            }else {
                this.initdata.push(this.ruleForm);
                localStorage.setItem("fogdata", toString(this.initdata));
            }
          this.$message.success("success!!");
          this.$router.push({
            path: "/home/fognode",
          });
        } else {
          console.log("error save!!");
          return false;
        }
      });
    },
  },
};
</script>
    <style lang='scss' scoped>
.form {
  width: 40%;
  padding: 16px;
  margin-left: 60px;
}

.el-button {
  width: 100%;
  margin-top: 40px;
}
</style>
    
       