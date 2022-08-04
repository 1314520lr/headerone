<template>
  <div class="commonList">

    <van-list v-model="loading" 
    :finished="finished" finished-text="没有更多了" @load="getList" :immediate-check="immediateCheck">
        <slot></slot>
    </van-list>

  </div>
</template>

<script>
import { List } from 'vant'
export default {
    name:commonList,
    data(){
        return{
            skip:0,
            List:[],
            finished:false,
            loading:false
        }
    },
    props:{
        limit:{
            type:Number,
            default:10
        },
        immediateCheck:{
             default:true,
            type:Boolean
           
        },
        API:{
           type:Function
        }
    },
    components:{
        [List.name]:List
    },
    methods:{
        getList(){
            let {skip,limit}=this;
            this.API({
                skip,limit
            }).then(res=>{
                if(res.data.code==0){
                    this.List.push(...res.data.data)
                    let len=this.list.length
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

<style lang="less" scoped>

</style>