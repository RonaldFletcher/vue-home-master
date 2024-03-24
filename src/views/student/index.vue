<template>
  <div class="box">
    <div class="top">
      <div
        class="left">
        <i class="el-icon-s-unfold"/>
        <span class="left-title">Members</span>
      </div>
      <div class="center">
        雾计算调度平台
      </div>
      <div class="right">
        <span class="time">{{ gettime }}</span>
        <i class="el-icon-refresh-left" />
        <i
          class="el-icon-s-custom"
          color="#fff"/>
      </div>
    </div>
    <div class="container">
      <left :left-list-data="leftListData"/>
      <div class="right">
        <router-view/>
      </div>
      
    </div>
  </div>
</template>

<script>
import left from './component/left'
export default {
  // 雾计算调度平台
  name:'Test',
  components: { left },
  data () {
    return {
      isCollapse: false,
      leftListData:[ 'Dashboard','Jobs','IOT Node','FOG Node']
    };
  },


  computed: {
    gettime(){
      return new Date().toLocaleTimeString()
    },
  },

  mounted(){},

  methods: {
  }
}

</script>
<style lang='scss' scoped>
.box {
  display: flex;
    flex-direction: column;
    height: 100vh;
}
.top{
    padding: 0 25px;
    height: 50px;
    background: #2596FD;
    display: flex;
    align-items: center;
    color: #fff;
    .left {
        cursor: pointer;
    }
    .left-title {
        margin-left: 10px;
    }
    .center {
        flex: 1;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .right {
        span {
            margin-right: 25px;
            font-size: 14px;
        }
        i{
            margin-right: 10px;
        }
    }
}
.container {
    width: 100%;
    display: flex;
    flex: 1;
    .right {
      flex: 1;
      overflow: auto;
    }
}
</style>