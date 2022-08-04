import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// 全局
import '@/components/vant.js'



import {info} from '@/api/user'
import axios from 'axios'
Vue.prototype.$http=axios

import mixin from '@/common/mixin.js'

Vue.mixin(mixin);





Vue.config.productionTip = false

// 时间过滤器
Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)
  const y=dt.getFullYear()
  const m=dt.getMonth()+1
  const d=dt.getDate()
   
  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')
  return  `${y}-${m}-${d} ${hh}:${mm}:${ss}` 
})


import init from '@/common/init'

Vue.prototype.$Bus=new Vue()


const APP=new Vue({
  router,
  store,
  render: h => h(App)
})


init().then(res=>{
  APP.$mount('#app')
})
  







// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

