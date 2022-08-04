<template>
  <div class="info">
     <van-nav-bar left-arrow @click-left="$router.push('/my')" title="个人信息"/>


<!-- 头像 -->
<div>


 <input type="file" name="" hidden accept="image/*" id="file" ref="file" @change="change">
  <van-cell title="头像" center label="file">
    <label for="file">
              <van-image round width="50px" height="50px" fit="cover" :src="userInfo.avatar"/>
    </label>
      
 </van-cell>
</div>
<!-- 昵称 -->
    <div class="userinfo-item">
        <i>昵称</i>
        <input type="text" v-model="userInfo.nickname" placeholder="请输入昵称"/>
      </div>

     <!-- 性别 -->
   <div class="userinfo-item" @click="show = true">
        <i>性别</i>
        <input type="text" placeholder="请设置性别" :value="userInfo.sex"  readonly/>
      </div>
<van-action-sheet cancel-text="取消" v-model="show" :actions="actions" @select="onSelect" />

  <!-- 生日 -->
      <div class="userinfo-item">
        <i>生日</i>
        <input type="text" v-model="userInfo.birthday" placeholder="请在年月日后加-"/>
      </div>


     <!-- 按钮 -->
     <div style="margin: 30px 50px">
          <van-button round block type="primary"  style="background-color: skyblue;" size="normal" @click="keep()">保存</van-button>
        </div>
  </div>
</template>






<script>
import { cinfo } from '@/api/user';
import { Form,Field } from 'vant'
import { Image as VanImage } from 'vant';
import { ActionSheet } from 'vant';
import { Toast } from 'vant';
 import { Calendar,Cell } from 'vant';
 import { info } from '@/api/user';
// import { constants } from 'buffer';
import { mapState,mapActions } from 'vuex';
export default {
data() {
  return {
    value:'',
    updata:'',
    show: false,
      actions: [{ name: '男' }, { name: '女' }],
      userInfo:{}
   
  }
},
computed:{
...mapState(['userInfo','uid'])
},
created(){
  this.getinfo()
  this.userInfo=JSON.parse(JSON.stringify(this.$store.state.userInfo)) 
},
watch:{
  "$store.state.userInfo":{
    immediate:true,  //正常进来立刻初始化
    handler(n,o){
      this.userInfo=JSON.parse(JSON.stringify(n))
    }
  }
},
components:{
  [Form.name]:Form,
  [Field.name]:Field,
  [VanImage.name]:VanImage,
  [ActionSheet.name]:ActionSheet,
  [Toast.name]:Toast,
  [ Calendar.name]: Calendar,
  [Cell.name]:Cell
},
computed:{

},
methods:{
  ...mapActions(['upload']),
async  change(e){
  let fileList=[...e.target.files].map(v=>{
    return{
      file:v
    }
  })
  let [avatar]=await this.upload(fileList)
  console.log(avatar)
  // this.$set(this.userInfo,'avatar',avatar)
  this.userInfo.avatar=avatar
  // this.userInfo.avatar=avatar //  污染了数据 这个时候还没上传到服务器


},
  // 获取用户信息
  getinfo(){
    let token=localStorage.getItem('token')
    info({
      token
    })
    .then((res)=>{
      console.log(res)
      console.log('获取用户信息成功')
    }).catch((err)=>{

    })

  },
  // 性别选择
   onSelect(item) {
      this.show = false;
      this.userInfo.sex=item.name
      Toast(item.name);
    },
    // 保存用户信息
    keep(){
      let {avatar,nickname,sex,birthday}=this.userInfo

      let uid=localStorage.getItem('uid')

      cinfo({
        avatar,nickname,sex,birthday,uid
      })
      .then((res)=>{
        console.log(this.userInfo)
        console.log(res)
        if(res.data.code==0){
          Toast('更新成功!')
         
          let {userInfo}=res.data;
          // this.userInfo= userInfo
           localStorage.setItem('userInfo', JSON.stringify(userInfo))

// 本地改
// this.$store.commit('save',['userInfo',{avatar,nickname,sex,birthday}])

// 调接口改
           this.$store.dispatch('info',localStorage.getItem('token'))

           setTimeout(v => {
                this.$router.back()
            }, 800)
        }
      }).catch((err)=>{
        console.log('我趣,报了个错')
      })
    }
}
}
</script>



<!-- 样式 -->
<style lang="scss">
.imgs{
  height: 60px;
  p{
    padding-left: 10px;
    line-height: 60px;
  }
}
.image{
  /* margin-left: 80px; */
  position: absolute;
  top: 0px;
  right: 30px;
}
.userinfo-item{
  display: inline-block;
  i{
    font-style: normal;
    padding-left: 10px;
    font-size: 14px;
      position: relative;
    top: 26px;
  }
  input{

     width: 220px;
      text-align: right;
      color: #333;
      line-height: 36px;
      height: 36px;
      margin-left: 130px;
      border: 0px;
  }
}
</style>