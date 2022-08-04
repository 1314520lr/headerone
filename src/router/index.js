import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue'),
    meta:{
      isRoot:true,
      keep:true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/search/search.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import( '../views/info.vue'),
    meta:{
      auth:true
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import( '../views/reg.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue'),
  },
  {
    path: '/send',
    name: 'send',
    component: () => import( '../views/send.vue'),
    meta:{
      isRoot:true,
      keep:true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import( '../views/my.vue'),
    meta:{
      isRoot:true
    }
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import( '../views/search/searchList.vue'),
    meta:{
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import( '../views/article/article.vue'),
    meta:{
    }
  },
  {
    path: '/xiugia',
    name: 'xiugia',
    component: () => import( '../views/xiugia.vue'),
  }
  ,
  {
    path: '/Miss',
    name: 'Miss',
    component: () => import( '../views/Miss.vue')
  },
  {
    path: '/call',
    name: 'call',
    component: () => import( '../views/call.vue')
  },
  {
    path: '/aboutwe',
    name: 'aboutwe',
    component: () => import( '../views/aboutwe.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import( '../views/collect.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import( '../views/history.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import( '../views/mine.vue')
  }
]

const router = new VueRouter({
  routes
})




// 路由切换前   
// router.beforeEach((to,from,next)=>{
//   // to  去哪里
//   // from 从哪来
//   // next 后续的操作  是否放行 转到哪儿去
//   if(to.meta.auth){
//     // 如果去的地方需要权限
//     let token=localStorage.getItem('l-token')
//     let uid=localStorage.getItem('1-uid')
//     let hasAuth=token&&uid


//     if(!hasAuth&&to.name!='login'){
//       router.replace('/login')
//     }else{
//       console.log('往哪儿跑?去登录')
//      next()
//     }
//   }else{
//     // 如果不是  直接放行
//     next()
//   }
// next()
// })

export default router
