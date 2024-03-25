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
          :disabled="noedit"
          v-model="ruleForm.id"/>
      </el-form-item>
       <el-form-item
        label="别名"
        prop="display" >
        <el-input
          :disabled="noedit"
          v-model="ruleForm.display"/>
      </el-form-item>
       <el-form-item
        label="所有者"
        prop="" >
          <el-select :disabled="noedit" v-model="ruleForm.owner" placeholder="任务所属物联网节点">
            <el-option :label="item.name" :value="item.name" v-for="(item,index) in allnode" :key="index"></el-option>
        </el-select>
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
            v-if="!haddle"
            type="primary"
            @click="submitForm('ruleForm')">
            保存
        </el-button>
        <el-button
            v-else
            @click="openFullScreen"
            v-loading.fullscreen.lock="fullscreenLoading"
            type="primary">
            执行
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { toString, tojson, formatDate } from "../../../util/filter.js";
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
        ]
      },
      flag:'',
      allnode:[], // 获取到所有node
      haddle:false, // 是否为执行任务
      fullscreenLoading:false, // 控制加载中 是否显示
      haddleresult:false, // 执行结果
      starttime: '', // 开始执行时间
      endtime:'',// 执行结束时间
    };
  },


  computed: {
    noedit(){
        console.log(this.flag, this.haddle,'-----')
        return this.flag || this.haddle
    }
  },

  mounted(){
    this.haddle = false
    this.flag = false
    this.getallnode()
    this.initdata = tojson(localStorage.getItem("jobdata"));
    const query = this.$route.query
    if(!query.status) return
    const { status , haddle} = query
    this.ruleForm = status
    this.flag = status ? true : false;
    this.haddle = haddle || false

  },

  methods: {
    getallnode(){
        const lot = tojson(localStorage.getItem("lotdata")) || []
        const fog = tojson(localStorage.getItem("fogdata")) || []
        this.allnode  = lot.concat(fog) 
    },
    // 执行任务 随机时间长度
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    openFullScreen() {
        const time  = this.getRandomNumber(1000,10000)
        this.fullscreenLoading = true;
        this.starttime = new Date() // 记录开始执行时间
        setTimeout(() => {
          this.fullscreenLoading = false;
            this.endtime = new Date() // 执行结束
          if(time < 5000){
            this.$message.success('成功')
            this.haddleresult = true
          } else {
            this.$message.error('失败')
            this.haddleresult = false
          } 
          //  处理当前数据
          this.ruleForm.schedule = formatDate(this.starttime) 
          if(this.haddleresult) this.ruleForm.lastsuccess = formatDate(this.endtime)
          else this.ruleForm.lasterror = formatDate(this.endtime)
          this.ruleForm.timeone = `${time}s`
          this.ruleForm.status = this.haddleresult == true ? '成功' : '失败'
          this.setdata()
          this.$router.push({ path: '/home/job' });
        }, time);
        console.log(this.ruleForm,'ruleForm')
      },
    //   把内存数据找出来 编辑/执行
    setdata(){
        const data = this.initdata.map(item=>{
            if(item.id === this.ruleForm.id) {
                return this.ruleForm
            }
            return item
        })
        localStorage.setItem("jobdata", toString(data));
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.ruleForm.status = '未开始'
            // 如果是编辑 flag为true
            if(this.flag){
                this.setdata()
            }else {
                this.initdata.push(this.ruleForm);
                localStorage.setItem("jobdata", toString(this.initdata));
            }
          this.$message.success('success!!')
          this.$router.push({ path: '/home/job' });
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
    margin-left: 60px;
}
.el-select {
    width: 100%;
}
.el-button {
    width: 100%;
    margin-top: 60px;

}
</style>

   