<template>
  <div class="history">
     <van-nav-bar fixed placeholder left-arrow @click-left="$router.back()" title="历史浏览" />

     <div>
     <li v-for="item in historylist" :key="item._id" class="searchli">
            <p class="p1">{{item.title}}</p>
            <div :class="{none:item.poster_type ==1,articlesingleImg:item.poster_type ==2,articlemoreImg:item.poster_type ==3}">
                 <img class="imgss" :src="imageSrc" v-for="imageSrc in item.imageSrc" :key="imageSrc" alt="">
            </div>
            <p class="pt">{{item.time|dateFormat}}</p>
        </li>
</div>
  </div>
</template>

<script>
import {gethistory} from '@/api/user'
import { mapState } from 'vuex'
export default {
  name:'history',
  data(){
    return{
      historylist:[],
      skip:0,
      limit:50
    }
  },
  computed:{
    ...mapState(['uid'])
  },
  created(){
    this.gethistory()
  },
  methods:{
    gethistory(){
      let {uid,skip,limit}=this
      gethistory({
        uid,skip,limit
      }).then(res=>{
        if(res.data.code==0){
          this.historylist=res.data.data
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
  // 单个图片
.articlesingleImg{
    img{
      margin-top: 20px;
        width: 100%;
        height: 50%;
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