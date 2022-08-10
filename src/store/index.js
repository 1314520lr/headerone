import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)
const SAVE='save'
import {info} from '@/api/user';
import {getQiniutoken, uploadQiniu } from "@/api/publish";
export default new Vuex.Store({
  state: {    //  类似于data  放数据的东西
    uid:'',
    token:'',
    userInfo:{},
    isLogin:false,
    liked_num:0,
    publish_num:0
  },
  getters: {    //  vuex里的计算属性
  },
  // 改数据  方法
  mutations: {
    [SAVE](state,[key,val]){
      // val===['uid',uid]
state[key]=val
    },
    clear(state){
      state['uid']=''
      state['token']=''
      state['userInfo']=''
      state['isLogin']=false
      state['liked_num']=0
      state['publish_num']=0

    }
  },
  actions: {
    //调接口
    info({commit},token){

     return info({
        token
      }).then(res=>{
        console.log(res)
        console.log('获取接口成功')

        let {uid,token,userInfo,liked_num,publish_num}=res.data
        commit('save',['uid',uid])
        commit('save',['token',token])
        commit('save',['userInfo',userInfo])
        commit('save',['isLogin',true])
        commit('save',['liked_num',liked_num])
        commit('save',['publish_num',publish_num])

      })
    },
     // 上传图片
     async upload(o,fileList){
      
      // 接收filelist数组
      if(!Array.isArray(fileList)||fileList.length===0){
        return []
      }
      
// 多图需要多个上传任务
//  Promise.all  接收多个数组   检测所有的数组都成功之后 把他们组成新的数组 并返回
 let task= fileList.map(v=>{
 return new Promise((resolve,reject)=>{
     let file = v.file; //  第一步

     let { type } = file; //  第二步 结构出type
      type = type.split("/")[1];
      // 重新命名
      let file_name = `${new Date().getTime()}_${Math.random().toString(36).slice(2)}.${type}`;

        
      // 获取到上传到七牛云的认证token
      getQiniutoken().then((res) => {
        // 靠用户名密码认证信息生成的
        console.log(res);
 
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("token", res.data.token);
        formdata.append("key", file_name);

        // 上传到七牛云的服务器
       uploadQiniu(formdata).then((res) => {
          resolve(`http://toutiao.longxiaokj.com/` + res.data.key);
        });
      });
 })
})
let imgList=await Promise.all(task)

return imgList
      
      
      //return 返回值是上传到服务器的地址
    },
  },
  modules: {  //  模块化

  }
})
