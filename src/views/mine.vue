<template>
  <div class="mine">
     <van-nav-bar fixed placeholder left-arrow @click-left="$router.back()" title="我发布的" />




<div>
     <li v-for="(item,index) in myarticle" :key="item._id" class="searchli">
            <p class="p1">{{item.title}}</p>
            <div :class="{none:item.poster_type ==1,articlesingleImg:item.poster_type ==2,articlemoreImg:item.poster_type ==3}">
                 <img class="imgss" :src="imageSrc" v-for="imageSrc in item.imageSrc" :key="imageSrc" alt=""></img>
            </div>
           <div class="bottomx">
             <p class="pt">发布于:{{item.time|dateFormat}}</p>
            <p class="pd" @click="delsend(index)">删除</p>
           </div>
        </li>
</div>





  </div>
</template>





<script>
import { getmyarticle,delsend } from '@/api/user'
import { mapState } from 'vuex'
export default {
    name:'mine',
    data() {
        return {
            skip:0,
            limit:50,
            myarticle:[],
        }
    },
    computed:{
        ...mapState(['uid','publish_num'])
    },
    created(){
        this.getmyarticle()
    },
    methods:{
        // 获取我的发布
        getmyarticle(){
            let {uid,skip,limit,index}=this
            getmyarticle({
                uid,limit,skip,index
            }).then(res=>{
                  console.log(res)
                if(res.data.code==0){
                    this.myarticle=res.data.data
                }
            }).catch(err=>{

            })
        },
        // 删除我的发布
        delsend(index){
             let  _id=this.myarticle[index]._id;
                   
            delsend({
               _id
            }).then(res=>{
                console.log(res)
                this.getmyarticle()

            }).catch(err=>{

            })
        }
    }
}
</script>








<style lang="less" scoped>
 .none{
    display: none;
  }
  .articlemoreImg img{
    width: 50%;
    height: 100%;
  }
.articlesingleImg{
    img{
        width: 100%;
        height: 100%;
    }
}
.searchli{
    list-style: none;
     margin-bottom:20px;
     margin-top: 15px;
}
.p1{
    padding-left: 15px;
    padding-bottom: 5px;
    white-space: nowrap;
    width: 85%;
    overflow: hidden;
    font-size: 20px;
    font-weight: normal;
}
.pt{
    text-align: left;
    padding-left: 15px;
    padding-top: 5px;
    color: #999;
    font-size: 15px;
}
.pd{
     text-align: right;
    padding-right: 15px;
    color: red;
    font-size: 15px;
}

</style>