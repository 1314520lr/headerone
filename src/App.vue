<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keep"/>
    </keep-alive>
     <router-view v-if="!$route.meta.keep"/>
   


    <van-tabbar v-model="act" fixed z-index="999" v-if="$route.meta.isRoot"> 
        <van-tabbar-item icon="home-o" name="/" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="add-o" name="send" to="/send">发布</van-tabbar-item>
        <van-tabbar-item icon="contact" name="my" to="/my">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
// import { Toast } from 'vant'
export default {
  data() {
    return {
      act:''
    }
  },
  created(){

  }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: auto;
  background-color: rgb(245, 242, 242);
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
*{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
}
</style>
