<template>
  <div class="form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm">
      <el-form-item
        label="id"
        prop="id" >
        <el-input
          :disabled="flag==='edit'"
          v-model="ruleForm.id"/>
      </el-form-item>
       <el-form-item
        label="名称"
        prop="name" >
        <el-input
          :disabled="flag==='edit'"
          v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item
        label="别名"
        prop="displayname">
        <el-input v-model="ruleForm.displayname"/>
      </el-form-item>
      <el-form-item
        label="时区"
        prop="timeone">
        <el-input v-model="ruleForm.timeone"/>
      </el-form-item>
      <el-form-item
        label="作业开始时间"
        prop="schedule">
        <el-input v-model="ruleForm.schedule" placeholder="任务的 Cron 表达式。指定任务何时运行。"/>
      </el-form-item>
       <el-form-item
        label="所有者"
        prop="" >
        <el-input
          :disabled="flag==='edit'" placeholder="任务所属物联网节点"
          v-model="ruleForm.owner"/>
      </el-form-item>
      <el-form-item label="带宽" prop="bw">
        <el-select v-model="ruleForm.bw" placeholder="请选择带宽需求">
        <el-option label="5Mbps" value="5Mbps"></el-option>
        <el-option label="10Mbps" value="10Mbps"></el-option>
        <!-- 添加更多选项 -->
      </el-select>
      </el-form-item>
      <el-form-item label="内存" prop="ram">
        <el-select v-model="ruleForm.ram" placeholder="请选择内存需求">
        <el-option label="256MB" value="256MB"></el-option>
        <el-option label="512MB" value="512MB"></el-option>
        <el-option label="1GB" value="1GB"></el-option>
        <!-- 添加更多选项 -->
      </el-select>
      </el-form-item>
      <el-form-item label="中央处理器能力" prop="cpu">
      <el-select v-model="ruleForm.cpu" placeholder="请选择中央处理器速度">
        <el-option label="50MIPS" value="50MIPS"></el-option>
        <el-option label="100MIPS" value="100MIPS"></el-option>
        <el-option label="150MIPS" value="150MIPS"></el-option>
        <el-option label="200MIPS" value="200MIPS"></el-option>
        <!-- 添加更多选项 -->
      </el-select>
    </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      ruleForm: {
        id: '',
        name:'',
        displayname: '',
        schedule: '',
        owner: '',
        bw:'',
        ram: '',
        CPU:''
      },
      rules: {
        id: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        /*status: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],*/
      },
      flag:'add'
    };
  },


  computed: {},

  mounted(){
    const query = this.$route.query
    if(!query.flag) return
    const { flag, status } = query
    this.flag = flag
    this.ruleForm = status
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('success!!')
          this.$router.push({ path: '/home/job', query: {
            status: this.ruleForm,
            flag: this.flag
          } });
        } else {
          console.log('error save!!');
          return false;
        }
      });
    },
  }
}

</script>
<style lang='scss' scoped>
.form {
    width: 40%;
    padding: 16px;
}
</style>

   