<template>
  <div class="miss">
     <van-nav-bar left-arrow @click-left="$router.push('/my')" title="找回密码"/>


     <!-- 找回密码 -->
       <van-form validate-first ref="regForm">
  <!-- 通过 pattern 进行正则校验 -->
  <van-field v-model="username" name="username" label="手机号" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入合法手机号' }]"/>

  <!-- 获取验证码 -->
  <van-field v-model="vercode"  clearable  name="vercode" label="短信验证码" placeholder="请输入短信验证码">
   <template #button>
    <van-button size="small" style="background-color: skyblue;" type="primary" native-type="button" :disabled="btnDisabled" @click="sendSms">{{code_txt}}</van-button>
  </template>
</van-field>
  <!-- 通过 validator 进行函数校验  密码 -->
  <van-field v-model="password" name="password" type="password" label="密码" placeholder="请输入新的密码" :rules="[{ validator, message: '请输入规范密码' }]"/>

<!-- 注册 -->
  <div style="margin: 16px;">
    <van-button style="background-color: skyblue;" round block type="info" @click="submit">完成</van-button>
  </div>W
</van-form>

  </div>
</template>

<script>
import { sendSms } from '@/api/sendSms';
import { misspwd,delete_user } from '@/api/user';
import { Toast } from 'vant';
export default {
data() {
    return {
        username:'',
        password:'',
         pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        vercode:'',
        btnDisabled:false,
        code_txt:'发送验证码'
    }
},
created() {
  //  注销用户
  delete_user({
    username:'17639642656',
    password:'123456'
  })
},
methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^\d{6}$/.test(val);
    },
    // 发送验证码
  async sendSms(){


try{
await  this.$refs.regForm.validate('username')

this.btnDisabled=true

let timer=null
let count=60


sendSms({
        mobile:this.username,
        type:'login'
      })
      .then(res=>{
        if(res.data.code==0){
        Toast(`验证码已发送到${this.username},请在5分钟内填写`)
        this.code_txt='验证码已发送'

        setInterval((e) => {
          count --
          this.code_txt=`${count}s后再次发送`

          if(count<=0){
            clearInterval(timer)
            count=60
            this.code_txt='再次发送'
            this.btnDisabled=false
          }
        }, 1000);



      }else{
        Toast(`${this.username}用户已存在`)
        this.code_txt='滚去登录'
        this.btnDisabled=false
        this.code_txt='再次发送'
        
      }
      }).catch(err=>{
        Toast(res.msg||'网络错误')
        this.btnDisabled=false
        this.code_txt='再次发送'
      })

    
}catch(error){

}
  },
    //     完成密码找回
    submit(){
      let {username,password,vercode}=this
      misspwd({username,password,vercode})
      .then((res)=>{
        console.log(res)
        Toast('找回密码成功!')
// 页面返回
        setTimeout((v) => {
            this.$router.push('/login');
          }, 800);
        
      }).catch((err)=>{

      })
    },
    log(){
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="less" scoped>
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
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
    text-align: center;
}


</style>