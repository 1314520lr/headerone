<template>
  <div class="xiugai">
     <van-nav-bar left-arrow @click-left="$router.back()" title="修改密码"/>

     <van-form validate-first ref="regForm">
<van-field v-model="oldPassword" name="password" type="password" label="请输入旧密码" placeholder="请输入旧密码" :rules="[{ validator, message: '请输入规范密码' }]"/>
  <van-field v-model="newPassword" name="password" type="password" label="请输入新密码" placeholder="请输入新密码" :rules="[{ validator, message: '请输入规范密码' }]"/>

<!-- 注册 -->
  <div style="margin: 16px;">
    <van-button style="background-color: skyblue;" round block type="info" @click="submit">保存修改</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
import {updatePwd} from '@/api/user'
import { mapState } from 'vuex'
import { Toast } from 'vant'
import router from '@/router'
export default {
  name:'xiugai',
  data(){
    return {
      oldPassword:'',
      newPassword:''
    }
  },
  // 组件
  components:{

  },
  //Gouzi
  computed:{
    ...mapState(['uid'])

  },
  methods:{
     validator(val) {
      return /^\d{6}$/.test(val);
    },
    submit(){
      let {uid,oldPassword,newPassword}=this
updatePwd({
uid,oldPassword,newPassword
}).then(res=>{
  console.log(res)
  if(res.data.code==0){
    Toast(res.data.msg)
    setTimeout((v) => {
      this.$router.push('/login')
    }, 1000);

  }
}).catch(err=>{

})
    }
  }

}
</script>

<style>

</style>