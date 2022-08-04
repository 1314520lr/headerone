<template>
  <div class="collect">
    <van-nav-bar fixed placeholder left-arrow @click-left="$router.back()" title="我的收藏" />



<div>
     <li v-for="item in favlist" :key="item._id" class="searchli">
            <p class="p1">{{item.title}}</p>
            <div :class="{none:item.poster_type ==1,articlesingleImg:item.poster_type ==2,articlemoreImg:item.poster_type ==3}">
                 <img class="imgss" :src="imageSrc" v-for="imageSrc in item.imageSrc" :key="imageSrc" alt=""></img>
            </div>
            <p class="pt">收藏于:{{item.time|dateFormat}}</p>
        </li>
</div>


  </div>
</template>

<script>
import {getfavlist} from '@/api/user'
import { mapState } from 'vuex'
export default {
  name:'collect',
  data(){
    return {
      favlist:[],
      skip:0,
      limit:50
    }
  },
 computed:{
  ...mapState(['uid'])
 },
  created(){
    this.getfavlist()
  },
  methods:{
    getfavlist(){
      let {uid:user_id,skip,limit}=this
      getfavlist({
        user_id,skip,limit
      }).then(res=>{
        console.log(res)
        if(res.data.code==0){
          this.favlist=res.data.data
          console.log(res.data.data)
        }
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
  // 多图的情况
  .articlemoreImg img{
    width: 50%;
    height: 100%;
  }
.articlesingleImg{
    img{
      margin-top: 20px;
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
    text-align: right;
    padding-right: 15px;
    padding-top: 5px;
    color: #999;
    font-size: 15px;

}

</style>