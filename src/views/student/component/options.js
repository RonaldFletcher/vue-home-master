export const columns = [
  { prop:'id',label:'id' , width: '120' },//作业id。必须是唯一的
  { prop:'display',label:'别名' , width: '180' },//作业的显示名称。如果存在，则显示该名称，而不是默认名称。
  { prop:'timeone',label:'时区' , width: '120' },//将评估 cron 表达式的时区。
  { prop:'schedule',label:'开始执行时间' , width: '160' },//任务的 Cron 表达式。指定任务何时运行。
  { prop:'lastsuccess',label:'上次成功时间' , width: '180' },//没成功不显示
  { prop:'lasterror',label:'上次失败时间' , width: '180' },//没失败不显示
  { prop:'status',label:'状态' , width: '160' },
  { prop:'enabled',label:'是否禁用' , width: '160' },
]
// dashcolumn
export const dashcolumn = [
  { prop:'name',label:'名称' , width: '250' },
  { prop:'addr',label:'地址' , width: '250' },
  { prop:'port',label:'端口' , width: '200' },
  { prop:'status',label:'状态' , width: '200' },
  { prop:'tags',label:'标签' , width: '180' },
]
export const options = [

  {
    value: 'success',
    label: 'success'
  }, 
  {
    value: 'failed',
    label: 'failed'
  },
  {
    value: 'untriggered',
    label: 'untriggered'
  }
]
export const listdata = [
  {
    class:'el-icon-copy-document',
    title:'Leader',
    value:'leader',
    tip:'node'
  },
  {
    class:'el-icon-copy-document',
    title:'总任务',
    value:'total',
    num:1
  },
  {
    class:'el-icon-copy-document',
    title:'成功任务',
    value:'success',
    num:1
  },
  {
    class:'el-icon-copy-document',
    title:'失败任务',
    value:'failed',
    num:0
  },
  {
    class:'el-icon-copy-document',
    title:'非触发式作业',
    value:'untriggered',
    num:1
  }
]
export const tableData =[
  {
    id: 'job1',
    display: '123',
    timeone: 'europe/berlin12',
    schedule:'20s',
    success:'1448',
    error:'0',
    lastsuccess:'',
    lasterror:'12',
    status:'success',
    enabled:''
  },
  {
    id: 'job2',
    display: '',
    timeone: 'europe/berlin',
    schedule:'20s',
    success:'1448',
    error:'0',
    lastsuccess:'',
    lasterror:'12',
    status:'success',
    enabled:''
  },
  {
    id: 'job3',
    display: '',
    timeone: 'europe/berlin',
    schedule:'20s',
    success:'1448',
    error:'0',
    lastsuccess:'',
    lasterror:'12',
    status:'failed',
    enabled:''
  },
]