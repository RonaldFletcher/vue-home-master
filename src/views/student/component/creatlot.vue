<template>
  <div class="form">
    <div class="top">
      <el-button type="primary">新增</el-button>
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
      :width="item.width"
      :fixed="item.props === 'id'"
    />
    <el-table-column label="" min-width="160" fixed="right">
      <template slot-scope="scope">
        <span @click="handleEdit(scope.$index, scope.row)" class="edit">
          <i class="el-icon-edit" />
          <span style="margin-left: 6px">编辑</span>
        </span>
        <span @click="handleEdit(scope.$index, scope.row)" class="edit">
          <i class="el-icon-delete" />
          <span style="margin-left: 6px">删除</span>
        </span>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </div>
  
</template>

<script>
export default {
  components: {},
  data() {
    return {
      columns: [
        { prop: "id", label: "id", width: "80" ,},
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
      tableData: [
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
      ],
      IoT_ruleForm: {
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
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handleEdit(){}
  },
};
</script>
<style lang='scss' scoped>
.form {
  padding: 16px;
  display: flex;
    flex-direction: column;
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
}
</style>

   