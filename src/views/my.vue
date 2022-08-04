<template>
  <div class="my">
    <!-- 登录了 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="header" v-if="$store.state.isLogin">
      <div class="top">
        <div class="imger">
          <van-image round width="70px" height="70px" fit="cover" :src="userInfo.avatar" @click="$router.push('/info')"/>
        </div>
        <p style="cursor: pointer" @click="$router.push('/info')">{{userInfo.nickname}}</p>
        <div class="bj" @click="$router.push('/info')">编辑资料</div>
      </div>
      <div class="mine">
        <div class="one"  @click="mine">
          <span>{{publish_num}}</span>
          <h2>头条</h2>
        </div>
        <div class="zan">
          <span>{{liked_num}}</span>
          <h2>获赞</h2>
        </div>
      </div>
    </div>
<!-- 没登录 -->
     <div class="header" v-else>
      <div class="top">
        <div class="imger">
          <img src="#" alt="">
        </div>
        <p style="cursor: pointer" @click="$router.push('/login')">请登录</p>
      </div>
    </div>

    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="收藏" to="/collect" />
      <van-grid-item icon="clock-o" text="历史" to="/history" badge="99+" />
    </van-grid>
    <!-- 栏目 -->
    <van-cell-group>
      <van-cell title="修改密码" v-if="$store.state.isLogin" is-link to="/xiugia" />
      <van-cell title="联系我们" is-link to="/call" />
      <van-cell title="关于我们" is-link to="/aboutwe" />

      <!-- 退出登录 -->
      <van-cell is-link @click="showPopup" v-if="$store.state.isLogin">退出登录</van-cell>
    </van-cell-group>
    </van-pull-refresh>
  </div>
</template>


<script>
import { Info } from "vant";
import { Dialog } from "vant";
import { Cell,Image,PullRefresh,Toast } from "vant";
import { mapState,mapMutations } from "vuex";
export default {
  name: "my",
  data() {
    return {
      refreshing:false,
      finished:false
    };
  },
  components: {
    [Cell.name]: Cell,
    [Image.name]:Image,
      [PullRefresh.name]:PullRefresh,
      [Toast.name]:Toast
  },
  computed:{
     ...mapState(['userInfo','isLogin','publish_num','liked_num'])
  },
  mounted() {},
  created() {
    // let userInfo = localStorage.getItem("l-userInfo");
    // let token = localStorage.getItem("l-token");
    // let uid = localStorage.getItem("l-uid");
    // if (userInfo) {
    //   this.userInfo = JSON.parse(userInfo);
    //   this.token = token;
    //   this.uid = uid;
    // }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
         this.refreshing=false 

        
       
      }, 1000);
    },
    ...mapMutations(['clear']),
    // 改变vuex存的数据  退出登录
    async showPopup() {
     await Dialog.confirm({
        title: "温心提示",
        message: "您要退出当前登录吗",
      })
        .then(() => {
         localStorage.clear()   ///  清空所有的本地存储
          // 把vuex里的也清除掉
          this.clear()


          

         
        })
        .catch((err) => {
          // Toast("");
        });
    },
    // 获取用户信息
    getinfo() {
      Info({
        token,
      })
        .then((res) => {
          localStorage.getItem("token");
          // let userInfo= localStorage.getItem('userInfo')
          console.log(res.data);

        })
        .catch((err) => {});
    },
    mine(){
      this.$router.push('/mine')
    }
  },
};
</script>


<style lang="less" scoped>
.header {
  height: 230px;
  background-color: #5fc2d6;
  display: flex;
  .top {
    width: 100%;
    height: 160px;
    display: flex;
      p {
    margin-top:65px;
    margin-left: 40px;
    color: white;
    width: 100px;
  }
  }

  .bj {
    color: white;
    margin-top: 70px;
    margin-left: 70px;
    font-size: 13px;
    cursor: pointer;
  }
  .imger {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-left: 20px;
    padding-top: 50px;
  }
}
.mine {
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 155px;
  .one {
    margin-left: 70px;
    span {
      margin-left: 9px;
      color: white;
      font-size: 20px;
    }
    h2 {
      padding: 0;
      margin: 0;
      height: 20px;
      color: white;
      font-weight: normal;
      font-size: 15px;
    }
  }
  .zan {
    margin-right: 70px;
    span {
      margin-left: 9px;
      color: white;
      font-size: 20px;
    }
    h2 {
      color: white;
      font-weight: normal;
      padding: 0;
      margin: 0;
      font-size: 15px;
    }
  }
}
</style>