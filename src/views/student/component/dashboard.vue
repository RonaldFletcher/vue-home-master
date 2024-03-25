<template>
  <div class="right">
    <div class="content">
      <div class="title">
        Welcome
      </div>
      <div class="list-content">
        <div
          @click="jumpTo(item)"
          class="list-item"
          v-for="(item,index) in listdata"
          :key="index">
          <div class="value">
            <i :class="item.class"/>
            <div>
              <p class="value-title">
                {{ item.title }}
              </p>
              <div class="tip-num">
                {{ item.tip || item.num }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nodes">
        <div class="nodes-title">
          nodes
        </div>
        <el-table
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          style="width: 100%"
          :default-sort="{prop: 'id', order: 'descending'}">
          <el-table-column
            v-for="(item ,index) in columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { listdata, dashcolumn } from './options'
export default {
  components: {},
  data () {
    return {
      listdata,
      data:[
        {
          name:'node',
          addr:'172.17.0.2',
          port:'8946',
          status:'alive',
          tags:'',
        }
      ],
      columns:dashcolumn
    };
  },


  computed: {},

  mounted(){},

  methods: {
    jumpTo(item){
      this.$router.push({ path: '/home/job', query: {
        status:item,
        flag:'search'
      } });
    }
  }
}

</script>
<style lang='scss' scoped>
.right {
    flex: 1;
    background: #fff;

    .content {
        padding: 20px 12px;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
        border-radius: 4px;
        .title {
            font-size: 24px;
            margin-bottom: 20px;
        }
    }
    .list-content {
        display: flex;
        .list-item {
            flex: 1;
            display: flex;
            height: 88px;
            border-radius: 6px;
            padding: 8px;
            margin-right: 18px;
            box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)
        }
        .value {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .value-title {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
            }
            .tip-num {
                font-size: 24px;
                text-align: right;
            }
        }
    }

    .nodes {
        margin-top: 20px;
        .nodes-title {
            font-size: 24px;
            margin-bottom: 40px;
        }
    }
}

</style>