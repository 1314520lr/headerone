<template>
  <div class="searList">
    <!-- 搜索列表 -->
     <van-nav-bar fixed placeholder left-arrow @click-left="$router.back()" title="搜索结果"/>



     <div class="inner">
        <!-- 下拉加载                数据-->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="getList">
                <!-- @load="getArticle"  是初始化好了以后自动触发一下   -->
            <li v-for="item in list" :key="item._id" class="searchli">
            <p class="p1">{{item.title}}</p>
            <img class="imgss" :src="imageSrc" v-for="imageSrc in item.imageSrc" :key="imageSrc" alt="">
            <p class="pt">{{item.time|dateFormat}}</p>
        </li>
        </van-list>
        </van-pull-refresh>
     </div>
     
  </div>
</template>

<script>
import {search as searchApi} from '@/api/api'
import { List,PullRefresh } from 'vant'
export default {
    name:'searchList',
    data(){
        return{
            list:[],
             loading: false,
            finished: false,
            refreshing:false,  // 控制刷新的
            loading:false,   // 是否加载
            finished:false,  //  是否完成
            skip:0,
            limit:10

        }
    },
    computed:{
        key_word(){
            return this.$route.query.key_word    //  从地址栏截取key_word
        }
    },
    components:{
        [List.name]:List,
        [PullRefresh.name]:PullRefresh
    },
    created(){
        // this.getList()
    },
    methods:{
        onRefresh(){
             // 刷新执行的事件
             setTimeout((v) => {
                
             
             this.skip=0
             this.finished=false
             this.getList(true)
             }, 1000);

        },
        getList(flag){
            let {key_word,skip,limit}=this;
            searchApi({
               key_word,skip,limit
            })
            .then(res=>{
                // console.log(res.data)
                if(res.data.code==0){
                    if(flag){    //  如果刷新就累加
                        this.list=res.data.data
                        this.refreshing=false
                    }else{
                        //  不是刷新就追加
                        this.list.push(...res.data.data)
                    }
                  
                    let len=this.list.length;
                    if(len>=res.count){
                        this.finished=true
                    }else{
                        this.loading=false
                        this.skip=len
                    }

                }
            })
        },
        
    }
}
</script>

<style lang="scss" scoped>
.imgss{
  width: 90%;
  height: 100%;
  margin-left: 18px;
}
.searchli{
    list-style: none;
     margin-bottom: 10px;
}
.p1{
    padding-left: 15px;
    white-space: nowrap;
    width: 85%;
    overflow: hidden;
    font-size: 20px;
    font-weight: 600;
}
.pt{
    padding-left: 15px;

}
</style>