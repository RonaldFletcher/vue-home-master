<template>
  <div class="job">
    <!-- 搜索，下拉框 -->
    <div class="top">
      <div class="left">
        <el-input
          @input="searchData"
          @clear="clearvalue"
          v-model="searchvalue"
          clearable
          placeholder="search id"/>
        <el-select
          @change="changeselect"
          v-model="statusvalue"
          @clear="clearselect"
          clearable
          placeholder="status">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="right">
        <span @click="createJob">+ create</span>
        <span>export</span>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort="{prop: 'id', order: 'descending'}">
      <el-table-column
        type="selection"
        min-width="55"/>
      <el-table-column
        v-for="(item ,index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"/>
      <el-table-column
        label=""
        min-width="160">
        <template
          slot-scope="scope">
          <span
            @click="handleEdit(scope.$index,scope.row)"
            class="edit">
            <i class="el-icon-edit"/>
            <span
              style="margin-left: 6px">编辑</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { columns, options, tableData } from './options'
export default {
  components: {},
  data () {
    return {
      searchvalue:'',
      statusvalue:'',
      options,
      columns,
      tableData
    };
  },


  computed: {},

  mounted(){
    // if(localStorage.getItem('job')){
    //   const jobdata =  JSON.parse(localStorage.getItem('job'))
    //   if(jobdata && typeof jobdata === 'object'){
    //     this.tableData = jobdata
    //   } 
    // }
   
    const query = this.$route.query
    if(!query) return
    const { flag, status } = query
    if(flag==='search' && ['success','failed','untriggered'].includes(status.value)){
      this.statusvalue = status.value
      this.changeselect()
    }

    if(flag === 'edit'){
      if(typeof status === 'object' ){
        console.log('edit')
        this.tableData = this.tableData.map(item=>{
          if(item.id === status.id){
            return status
          } 
          return item
        })
      }
      localStorage.setItem('job', JSON.stringify(this.tableData))
    }

    if(flag === 'add'){
      console.log(typeof status)
      if(typeof status === 'object' ) this.tableData.push(status)
      localStorage.setItem('job', JSON.stringify(this.tableData))
    }
    
  },

  methods: {
    handleEdit(index,row){
      this.$router.push({ path: '/home/create', query: {
        status: row,
        flag:'edit'
      } });
    },
    createJob(){
      this.$router.push({ path: '/home/create' });
    },
    clearvalue(){
      if(!this.statusvalue) return
      this.tableData = this.tableData.filter(item=>{
        return item.status === this.statusvalue
      })
    },
    searchData(){
      this.tableData = this.tableData.filter(item=>{
        return  item.id.includes(this.searchvalue)
      })
    },
    clearselect(){
      if(!this.searchvalue) return
      this.tableData  = this.tableData.filter(item=>{
        return item.id.includes(this.searchvalue) 
      })
    },
    changeselect(){
      this.tableData = this.tableData.filter(item=>{
        return  item.status === this.statusvalue
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.job {
    flex: 1;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .left {
        display: flex;
        .el-input {
            margin-right: 20px;

        }
    }
   
    .right {
        span {
            margin-right: 20px;
            color: #1976d2;
            cursor: pointer;
        }
    }
}
.edit {
    cursor: pointer;
    color: #1976d2;
}
</style>