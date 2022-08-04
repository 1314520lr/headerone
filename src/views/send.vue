<template>
  <div class="publish">
    <van-nav-bar fixed placeholder title="发布"></van-nav-bar>

    <div class="container">
      <van-form>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          style="margin-top: 10px"
          v-model="title"
          name="title"
          placeholder="请输入标题"
        />

        <van-field
          readonly
          clickable
          :value="cate_name"
          placeholder="请选择"
          @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            value-key="name"
            @cancel="showPicker = false"
          />
        </van-popup>

        <van-field
          style="margin-top: 10px"
          v-model="content"
          name="content"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
        />

        <van-field name="uploader" style="margin-top: 10px">
          <template #input>
            <van-uploader v-model="fileList" multiple :max-count="3" />
          </template>
        </van-field>

        <div style="margin: 10px 50px;padding-top: 60px;padding-bottom: 60px;">
          <van-button
            round
            block
            type="primary"
            size="normal"
            color="#5fc2d6"
            native-type="submit"
            @click="publish"
            >发布</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>

import {Form, Field,Popup ,Picker,Uploader} from "vant";

import { publish} from "@/api/publish";
import { mapState,mapActions } from "vuex";
import { getCateList } from "@/api/home.js";
export default {
  data() {
    return {
      title: "",
      content: "",
      fileList: [],
      cate_id: "",
      cate_name: "",
      columns: [],
      showPicker: false,
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Uploader.name]: Uploader,
  },
  created() {
    this.getCate();
  },
  computed: {
    ...mapState(["uid", "userInfo"]),
  },
  methods: {
    ...mapActions(['upload']),
    // 获取分类
    getCate() {
      getCateList().then((res) => {
        console.log(res);
        this.columns = res.data.data; // 第一次请求成功  他会有数据
      });
    },

   async  publish(e) {
      let { title, content, fileList, uid, userInfo, cate_name, cate_id } =this;
           
           if(!uid){
            this.$toast('请先登录')
            return 
           }
      console.log(title, content, fileList, uid, userInfo, cate_name, cate_id);
   

      let imageSrc = await  this.upload(fileList);//  上传逻辑 单独封装了  
      //  console.log(imageSrc)
      // return;

      publish({
        title,
        content,
        cate_name,
        cate_id,
        author_id: uid,
        imageSrc,
        author: userInfo.nickname,
      }).then((res) => {
        console.log(res);

           if(res.data.code == 0){
            this.$toast('恭喜您发布成功')
            setTimeout((v) => {
              this.$router.push('/')
              
            }, 1000);
            //  也可以做一个立即查看功能
           }else{
            this.$toast(res.data.msg)
           }

      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    onConfirm({ name, _id }) {
      this.cate_name = name;
      this.cate_id = _id;
      this.showPicker = false;
    },
  },
};
</script>
<style lang="less">
</style>