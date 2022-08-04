<template>
  <div class="changeinfo">
    <van-nav-bar
      left-arrow
      @click-left="$router.push('/my')"
      title="修改密码"
    />

    <van-form>
      <!-- 通过 validator 进行函数校验  密码 -->
      <van-field
        v-model="oldPassword"
        name="oldPassword"
        type="password"
        label="旧密码"
        placeholder="请输入旧密码"
        :rules="[{ validator, message: '请输入规范密码' }]"
      />

      <!-- 通过 validator 进行函数校验  密码 -->
      <van-field
        v-model="newPassword"
        name="newPassword"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ validator, message: '请输入规范密码' }]"
      />

      <!-- 注册 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          style="background-color: skyblue"
          @click="keepkey"
          >完成</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Button, Toast } from "vant";
import { mapState } from "vuex";
import { updatePwd } from "@/api/user";
export default {
  name: "xiugia",
  data() {
    return {
      oldPassword: '',
      newPassword: '',
    };
  },
  computed: {
    ...mapState(['uid'])
  },
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
  },
  methods: {
    validator(val) {
      return /^\d{6}$/.test(val);
    },
    // 保存修改后的密码
    keepkey() {
      let { oldPassword, newPassword, uid } = this;

      console.log(uid);
      console.log(oldPassword);
      console.log(newPassword)
      updatePwd({ oldPassword, newPassword, uid }).then((res) => {
          if (res.data.code == 0) {
            Toast("修改成功");
            // 页面返回
            setTimeout((v) => {
                localStorage.clear()   ///  清空所有的本地存储
              this.$router.push('/login');
            }, 800);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>