<template>
  <div class="commonList">

    <van-pull-refresh v-model="isrefreshing" @refresh="onRefresh" v-if="refresh">
         <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList" :immediate-check="immediateCheck">
            <slot :List="List"></slot>
          </van-list>
    </van-pull-refresh>

 <van-list v-model="loading" v-else :finished="finished" finished-text="没有更多了" @load="getList" :immediate-check="immediateCheck">
            <slot :List="List"></slot>
          </van-list>
    


  </div> 
</template>

<script>
import { List,PullRefresh } from 'vant'

export default {
    name:'commonList',
    data(){
        return{
            skip:0,
            List:[],
            finished:false,
            loading:false,
            isrefreshing:false
        }
    },
    props:{
        limit:{
            type:Number,
            default:10
        },
        immediateCheck:{
            type:Boolean,
            default:true
        },
        API:{
           type:Function
        },
       params:{
        type:Object
       },
       refresh:{
        default:false,
        type:Boolean
       } 
    },
    components:{
        [List.name]:List,
        [PullRefresh.name]:PullRefresh
    },
    created(){
        this.$Bus.$on('listrefresh',(e)=>{
            this.onRefresh()
        })
    },
    methods:{
        onRefresh(){
            this.skip=0
            this.finished=false
            this.getList(true)
        },
        getList(flag){
            let {skip,limit,params}=this
            this.API({
                skip,limit,
                ...params
            }).then(res=>{
                if(res.data.code==0){
                    if(flag){
                           this.List=res.data.data
                           this.isrefreshing=false
                    }else{
                        this.List.push(...res.data.data)
                    }
                 
                    let len =this.List.length
                    if(len>=res.data.count){
                        this.finished=true
                    }else{
                        this.loading=false
                        this.skip=len
                    }
                }
            })
        }
    }

}
</script>

<style>

</style>