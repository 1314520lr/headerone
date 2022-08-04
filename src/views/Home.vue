<template>
  <div class="home">
  <van-nav-bar fixed placeholder>
    <template #title>
      <router-link class="home-header-search" to="/search">
      <span class="ss">搜索</span>
      </router-link>
    </template>
  </van-nav-bar>
 <!-- 点击切换 -->
  <van-tabs v-model="active" @click="switchTab" class="tabs">
    <van-tab :title="item.name" v-for="item in cate" :key="item._id"></van-tab>
  </van-tabs>

<div class="articleList" style="padding-top:30px">
<!-- 下拉加载                数据-->
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
 <template #pulling="props">
    <img
      class="doge"
      src="https://img01.yzcdn.cn/vant/doge.png"
      :style="{ transform: `scale(${props.distance / 80})` }"
    />
  </template>

  <!-- 释放提示 -->
  <template #loosing>
    <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
  </template>

  <!-- 加载提示 -->
  <template #loading>
    <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
  </template>
<van-list v-model="loading" :finished="finished" @load="getArticle" :immediate-check="false">
 <!-- @load="getArticle"  是初始化好了以后自动触发一下   -->

 <template #finished>
   <div style="text-align: center;padding: 10px;">
   <van-icon name="clock-o" size="30" color="red" />
   </div>
 </template>

 <template #loading>
   <div style="text-align: center;padding: 10px;">
   <van-icon name="smile-o" size="30" color="red" />
   </div>
 </template>
  <li v-for="(item ,index) in articleList" :key="item._id" @click="$router.push({path:'/article',query:{id:item._id,title:item.title}})">
    <p class="titlep">{{item.title}}</p>
    <div :class="{none:item.poster_type ==1,articlesingleImg:item.poster_type ==2,articlemoreImg:item.poster_type ==3}">
       <img class="imgs" :src="imgageSrc"  v-for="imgageSrc in item.imageSrc">
    </div>
    <div class="info">
      <p>{{item.author}}</p><p class="p2">{{item.time|dateFormat}}</p>
    </div>
  </li>
</van-list>
</van-pull-refresh>
</div>
  </div>

</template>

<script>
// @ is an alias to /src

import { Tab, Tabs,List,Icon,PullRefresh, Toast  } from 'vant';
import {getCateList,getArticleList} from '@/api/home.js';  

export default {
  name: 'HomeView',
   data(){
    return {
       active: 0,
       cate:[],
       articleList:[],  // 文章列表
       loading:false,//  是否正在加载  
       finished:false,//  是否全部加载完毕  
       skip:0,  //  从skip 开始拿
       limit:20,//  一次拿多少条
       refreshing:false   //  是否处于刷新中
    }
  },
  components: {
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [List .name]:List ,
    [Icon.name]:Icon,
    [PullRefresh.name]:PullRefresh
  },
  computed:{

     cate_id(){
      //  获取到当前被选择的分类的id
         let active_cate = this.cate[this.active];
         if(!active_cate) return ''
         return active_cate._id
     }
  },
  created(){
    this.getCate();//   获取分类
  },
  //  组件被keep-alive缓存后 会多两个生命周期钩子 
  //  激活后   执行的比较晚  比mounted还wan    
  activated(){
    console.log('激活')
  },
  //  失活后
  deactivated(){
console.log('失活')
  },
  methods:{
        //  切换分类
    switchTab(){
      //  console.log(this.active)
       this.articleList = [];  //清空原来数据
         this.skip=0
         this.finished=false    //如果不改会有bug 切换分类会出错乱
         this.getArticle()
    },
    // 获取头部分类
    getCate(){
      getCateList()
      .then(res=>{
        console.log(res)
        this.cate = res.data.data;   // 第一次请求成功  他会有数据  
      //  第一个接口成功  调用第二个 
          this.getArticle()

      })
    },
    // 获取文章列表
    getArticle(flag){
      let {cate_id,skip,limit} = this;

      console.log('触发了上拉加载--------------------------------')
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        });
      getArticleList({
        cate_id,
        skip,limit
      }).then(res=>{
        console.log(res)
    //  <!-- //  我们的逻辑  每次拿到数据都 赋值给articleList   -->
    // <!-- //  应该做的是累加的操作  往上滑动数据是越来越多 -->
    // <!-- // articleList   []   skip  0      20
    // articleList   [20]   skip  20      20
    // articleList   [40]   skip  40      20
      // 每次请求完 做个判断  是否全部加载完毕了 如果加载完毕了  this.finished 改成 true
      // 如果没完毕  把loading 改成 false -->
setTimeout((v) => {
  if(flag){
    // 刷新
          this.refreshing = false;
          this.articleList=res.data.data
          
  }else{
      this.articleList.push(...res.data.data);
      Toast.clear()
  }

          
        let len = this.articleList.length;
        let count = res.count;

        if(len>=count){
          this.finished = true;
         
        }else{
          this.loading = false;
          this.skip = len; //  skip得动态的变化  
        }
        

}, 1000);
      }).catch(err=>{
        console.log(err)
      })
    },
    // 上拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');

         this.skip=0
         this.finished=false 
        this.getArticle(true)  // 数据拿到之后再执行刷新的操作

        
       
      }, 1000);
    },
  },
  }

</script>

<style lang="less" scoped>
.titlep{
  font-size: 20px;
  color: black;
  padding-left: 15px;
  padding-right: 18px;
position: relative;
margin-top: 20px;
margin-bottom: 10px;
font-weight: normal;
overflow: hidden;
}
.info{
  height: 30px;
  // border-bottom: 2px solid green;
  display: flex;
  p{
    justify-content: space-between;
    margin-left: 18px;
    margin-top: 10px;
    font-size: 13px;
    color: #777;
  }
  .p2{
    position: absolute;
    right: 18px;
    font-size: 13px;
  }
}
.imgs{
  width: 90%;
  height: 100%;
  margin-left: 18px;
}
.home-header-search{
    width: 280px;
    height: 34px;
    border-radius: 20px;
    background: #fefefe;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fff;
}

::v-deep .van-nav-bar__title{
  max-width:75%;
}

::v-deep .van-tabs--line .van-tabs__wrap{
  border-bottom: 1px solid #ccc;
}
::v-deep .van-tabs__wrap--scrollable .van-tab:last-of-type{ 
  border-right:0
}
::v-deep  .van-tabs__line {
   
    bottom: 5.4vw;
   
    width: 4.55557vw;
    
    background-color: blue;
   
}
.articleList{
  overflow: hidden;
  img{
    max-width: 100%;
  }

  .none{
    display: none;
  }
  .articlemoreImg{
    display: flex;
    img{
      width: 50%;
      height: 50%;
    }
    
  }
}
.doge {
    width: 140px;
    height: 72px;
    border-radius: 4px;
  }
  .ss{
    color: rgb(14, 116, 218);
  }
  .tabs{
    background-color: #fff;
    z-index: 988;
    position: fixed;
  }
</style>