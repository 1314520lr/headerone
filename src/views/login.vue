<template>
<div class="login">
    <van-nav-bar left-arrow @click-left="$router.push('/my')" title="登录/注册"/>


<div class="ipt">
    <!-- 输入手机号，调起手机号键盘 -->
<van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
<!-- 输入密码 -->
<van-field v-model="password" type="password" label="密码"  placeholder="请输入密码"/>

</div>

<!-- 登录 -->
<div class="btns">
    <button class="btn" style="background-color: skyblue;" @click="logining">登录</button>
</div>
<p class="zc">还没账号?前去<a @click="$router.push('/reg')" href="#">注册</a></p>


<p class="miss"><a @click="$router.push('/Miss')" href="#">忘记密码</a></p>

</div>
  
</template>

<script>
import {loging} from '@/api/user'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
data() {
    return {
        tel:'',
        password:'',
        
    }
},
computed:{
   
},
methods: {
    logining(){
        loging({
            username:this.tel,
            password:this.password
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code==0){
                Toast('登录成功')
                // 初始化用户信息
                 let { token,  uid,userInfo,tokenExpired } = res.data;

                localStorage.setItem("token", token);
                localStorage.setItem("uid", uid);
                localStorage.setItem('tokenExpired',tokenExpired)
                // 用户信息
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                this.$store.dispatch('info',token)

               this.$store.commit('save',['uid',uid])
               this.$store.commit('save',['token',token])
               this.$store.commit('save',['userInfo',userInfo])
                this.$store.commit('save',['isLogin',true])
                // this.$store.commit('save',['tokenExpired',tokenExpired])
            
            setTimeout((v) => {
                this.$router.push('/my')
            }, 800);

            
            }else{
                Toast('密码错误')
            }
          
        }).catch((err)=>{
                Toast('登录失败')
        })
    }
},
components:{
    [Toast.name]:Toast
}
}
</script>

<style lang="scss" scoped>
.ipt{
    margin-top: 10px;
}
.btns{
    margin: auto;
.btn{
    width: 260px;
    height: 40px;
    background-color: #07c160;
    border: 0;
    border-radius: 50px;
    color: white;
  margin-left: 60px;
  margin-top: 20px;
}
}
.zc{
    margin-top: 20px;
    text-align: center;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.miss{
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
a{
      color: orangered;
}
}
</style>