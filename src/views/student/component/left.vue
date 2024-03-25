<template>
  <div class="left-side">
    <div class="list">
      <div
      :class="{'light': lightitem ===item}"
       @click="clickMenu(item)"
       :index="item.catalogName"
        v-for="item in leftListData"
        :key="item">
        {{ item }} 
      </div>
    </div>
  </div>
</template>
  
<script>
const obj ={
  'Dashboard':'dashboard',
  'Jobs':'job',
  'IOT Node':'iotnode',
  'FOG Node':'fognode',
}
export default {
  name:'Leftside',
  components: {},
  props:{
    leftListData:{
      type:Array,
      default:()=>[]
    },
  },
  data () {
    return {
        lightitem:'Dashboard'
    };
  },
  
  methods: {
    clickMenu(index){
        this.lightitem = index
        this.$router.push({ path: `/home/${obj[index]}` });
    },
  }
}
  
</script>
  <style lang='scss' scoped>
  .left-side {
      
      padding-right: 6px;
      height: 100%;

      .list {
        min-width: 160px;
        display: flex;
        flex-direction: column;
        div {
          padding: 12px 10px 12px 30px;
          cursor: pointer;
        }
      }
      .light {
        color: #2596FD;
        background: #fff;
      }
  }
 
  
  </style>