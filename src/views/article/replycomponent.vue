<template>
  <div>
    <!-- 二级回复列表 -->
            <van-nav-bar fixed placeholder left-arrow @click-left="$emit('close')" title="1条回复">
            <template #left>
                <van-icon name="cross" size="20px"  color="#333"/>
            </template>
            </van-nav-bar>



             <van-cell class="comment-item" style="border: 1px solid #ccc;">
          <van-image slot="icon" class="avatar" round fit="cover" :src="replyinfo.info.avatar" />
          <div slot="title">
            <div class="title-w">
              <div class="name">{{ replyinfo.info.nickname }}</div>
              
            </div>
            <div class="content">{{ replyinfo.content }}</div>
            <div class="info">
              <span class="pubdate">{{ replyinfo.create_time | dateFormat }}</span>
              <div class="like-w" @click="commentLike">
                <van-icon class="like-icon"  :class="{ liked: replyinfo.is_like }" name="good-job" />
                <span class="like-count">{{ replyinfo.like_count==0?'赞':replyinfo.like_count }}</span>
              </div>
            </div>
          </div>
        </van-cell>

<commonList ref="replyList" :API="getreplylist" :params="{user_id,reply_comment_id:replyinfo._id,article_id}">
<template #default="{List}">

  <van-cell class="comment-item" border v-for="item in List" :key="item._id">
          <van-image slot="icon" class="avatar" round fit="cover" :src="item.info.avatar" />
          <div slot="title">
            <div class="title-w">
              <div class="name">{{ item.info.nickname }}</div>
              
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="info">
              <span class="pubdate">{{ item.create_time | dateFormat }}</span>
            </div>
          </div>
        </van-cell>
</template>
</commonList>


  </div>
</template>

<script>
import { Icon } from 'vant'
import { Image } from 'vant'
import {getreplylist} from '@/api/api'
import commonList from '@/components/commonList.vue'
export default {
name:'replycomponent',
data(){
    return{
getreplylist
    }
},
props:{
    replyinfo:{
        type:Object,
        default(){
            return {}
        }
    },
    active_reply_index:{
      type:Number
    },
    article_id:{

    }
},
computed:{
  user_id(){
    return this.$store.state.uid
  }
},
    beforeDestroy(){
         this.$Bus.$off('listrefresh')
    },
components:{
    [Icon.name]:Icon,
    [Image.name]:Image,
     [commonList.name]:commonList
},
methods:{
  commentLike(){
  let {is_like,_id}=this.replyinfo;
  let {active_reply_index}=this;

  this.$emit('togglike',
  _id,active_reply_index,is_like
  )

  }
}
}
</script>









<style lang="less" scoped>
::v-deep .van-nav-bar{
background-color: #fff;
border-bottom: 1px solid #999;
}
::v-deep .van-nav-bar__title{
    color: #000;
}
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }

  .name {
    font-size: 16px;
    color: #555;
  }

  .content {
    font-size: 16px;
    color: #222222;
    margin: 10px 0;
  }

  .info {
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: space-between;
  }

  .pubdate {
    font-size: 12px;
    margin-right: 12px;
  }

  .title-w {
    display: flex;
    justify-content: space-between;
    height: 36px;
    align-items: center;

  }

  .like-w {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .like-icon.liked {
    color: #ef092c
  }
}
</style>