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
          placeholder="搜索 id"
        />
        <el-select
          @change="changeselect"
          v-model="statusvalue"
          @clear="clearselect"
          clearable
          placeholder="状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary" @click="createJob">新增</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      @cell-click="cellclick"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
      >
      </el-table-column>
      <el-table-column label="是否禁用" width="180">
        <template slot-scope="scope">
            <el-switch  v-model="scope.row.enabled">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>日志： {{ scope.row.dateinfo }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.status }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="" min-width="160" fixed="right">
        <template slot-scope="scope">
          <span @click="handleEdit(scope.$index, scope.row)" class="edit">
            <i class="el-icon-edit" />
            <span style="margin-left: 6px">编辑</span>
          </span>
          <span @click="tohaddle(scope.$index, scope.row)" class="edit">
            <!-- <i class="el-icon-edit" /> -->
            <span style="margin-left: 6px">执行</span>
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
import { columns, options, tableData } from "./options";
import { toString, tojson } from "../../../util/filter.js";
export default {
  components: {},
  data() {
    return {
      searchvalue: "",
      statusvalue: "",
      options,
      columns,
      tableData,
    };
  },

  computed: {},

  mounted() {
    const initdata = tojson(localStorage.getItem("jobdata"))
    this.tableData = initdata
  },

  methods: {
    handleEdit(index, row) {
      this.$router.push({
        path: "/home/create",
        query: {
          status: row,
        },
      });
    },
    tohaddle(index, row){
        this.$router.push({
            path: "/home/create",
            query: {
                status: row,
                haddle: true
            },
      });
    },
    createJob() {
      this.$router.push({ path: "/home/create" });
    },
    clearvalue() {
      if (!this.statusvalue) return;
      this.tableData = this.tableData.filter((item) => {
        return item.status === this.statusvalue;
      });
    },
    searchData() {
      this.tableData = this.tableData.filter((item) => {
        return item.id.includes(this.searchvalue);
      });
    },
    clearselect() {
      if (!this.searchvalue) return;
      this.tableData = this.tableData.filter((item) => {
        return item.id.includes(this.searchvalue);
      });
    },
    changeselect() {
      this.tableData = this.tableData.filter((item) => {
        return item.status === this.statusvalue;
      });
    },
    cellclick(row, column, cell, event) {},
  },
};
</script>
<style lang='scss' scoped>
.job {
  flex: 1;
  padding: 10px;
  position: relative;
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
.page {
  position: absolute;
  bottom: -30px;
  right: 0;
}
</style>