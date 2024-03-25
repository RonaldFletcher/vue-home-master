<template>
  <div class="form">
    <div class="top">
      <el-button type="primary" @click="addfog">新增</el-button>
    </div>
    <el-table
      style="width: 100%"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        :fixed="item.props === 'id'"
      />
      <el-table-column label="" min-width="160" fixed="right">
        <template slot-scope="scope">
          <span @click="handleEdit(scope.$index, scope.row)" class="edit">
            <i class="el-icon-edit" />
            <span style="margin-left: 6px">编辑</span>
          </span>
          <span @click="deleterow(scope.$index, scope.row)" class="edit">
            <i class="el-icon-delete" />
            <span style="margin-left: 6px">删除</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
import {toString, tojson } from '../../../util/filter.js'
export default {
  components: {},
  data() {
    return {
      columns: [
        { prop: "id", label: "id", width: "80" },
        { prop: "name", label: "名称", width: "80" },
        { prop: "bw", label: "bw", width: "80" },
        {
          prop: "max_battery_capacity",
          label: "max_battery_capacity",
          width: "180",
        },
        {
          prop: "battery_sensing_rate",
          label: "battery_sensing_rate",
          width: "180",
        },
        {
          prop: "battery_sending_rate",
          label: "battery_sending_rate",
          width: "180",
        },
        { prop: "ioTClassName", label: "ioTClassName", width: "180" },
        { prop: "mobilityEntity", label: "mobilityEntity", width: "180" },
        {
          prop: "communicationProtocol",
          label: "communicationProtocol",
          width: "200",
        },
      ],
      tableData: [],
    };
  },

  computed: {},

  mounted() {
    const initdata = tojson(localStorage.getItem("fogdata"))
    this.tableData = initdata
  },

  methods: {
    handleEdit(index,row) {
        this.$router.push({ path: `/home/createFognode` , query: {
            status: row
          } });
    },
    deleterow(index, row){
        const data = this.tableData
        this.tableData = data.filter((item, key)=>{
            return key !== index
        })
        localStorage.setItem('fogdata', toString(this.tableData))
        this.$message.success('成功')

    },
    addfog(){
        this.$router.push({ path: `/home/createFognode` });
    },
  },
};
</script>
  <style lang='scss' scoped>
.form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .edit {
    cursor: pointer;
    color: #1976d2;
    margin-right: 10px;
  }

  .page {
    position: absolute;
    bottom: -30px;
    right: 0;
  }
}
</style>
  
     