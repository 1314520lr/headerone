import store from "@/store"
import { Toast } from "vant"

export default function(){
    return new Promise((resolve,reject)=>{
 // 登录状态维护
 let token=localStorage.getItem('token')
 let tokenExpired= localStorage.getItem('tokenExpired')
   
 // 用token换用户信息
 if(token){
   let now=new Date().getTime() 
   if(now>=Number(tokenExpired)){
     // token一过期
     localStorage.removeItem('token')
     localStorage.removeItem('tokenExpired')
    Toast('您的身份已过期,请重新登录')
     resolve()
   }else{
    Toast.loading({
      message: '加载中...',
      forbidClick: true, 
    });
    store
    .dispatch('info',token).then((res)=>{
     resolve()
     Toast.clear()
     }).catch(err=>{
        reject()
     })
   }
 
 }else{
  resolve()
 }


    })
}