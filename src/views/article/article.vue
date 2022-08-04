<template>
  <div class="article">
    <van-nav-bar fixed placeholder left-arrow @click-left="$router.push('/')" title="文章详情" />
<div>
  

    <div>
      <h1 class="title1">{{ title }}</h1>
      <!-- 骨架屏 -->
      <van-skeleton title avatar :row="4" :loading="!article._id">
        <div class="authors">
          <van-image class="img1" width="40px" height="40px" round fit="cover" :src="article.avatar" />
          <div class="txt">
            <p class="author1">作者:{{ article.author }}</p>
            <p class="time1">{{ article.time | dateFormat }}</p>
          </div>
        </div>
        <div id="lsp" v-html="article.content"></div>
      </van-skeleton>


      <van-image width="100%" height="" fit="cover" v-for="imageSrc in article.imageSrc" :key="imageSrc"
        :src="imageSrc" />
    </div>
    <!-- 分割线 -->
    <van-divider :hairline=false :style="{ borderColor: '#999', padding: '0 5px' }">
    </van-divider>

    <div class="commentList" ref="commentList">
      精彩评论
    </div>
    <div style="height: 580px;" class="neirong" ref="neirong">
      <van-list v-model="commentLoading" :finished="commentFinished" finished-text="没有更多了" @load="getcommentList">
        <!-- 文章评论列表 -->
        <van-cell class="comment-item" v-for="(item,index) in commentList" :key="item._id">
          <van-image slot="icon" class="avatar" round fit="cover" :src="item.info.avatar" />
          <div slot="title">
            <div class="title-w">
              <div class="name">{{ item.info.nickname }}</div>
              <div class="like-w" @click="commentLike(item._id,index,item.is_like)">
                <van-icon class="like-icon"  :class="{ liked: item.is_like }" name="good-job" />
                <span class="like-count">{{ item.like_count==0?'赞':item.like_count }}</span>
              </div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="info">
              <span class="pubdate">{{ item.create_time | dateFormat }}</span>
              <van-button class="reply-btn" @click="openreply(item,index)" round size="mini">{{ item.reply_num == 0 ? '' : item.reply_num }}回复</van-button>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    </div>

    <!-- 底部发布 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round @click="openpopup()" size="small">写评论
      </van-button>
      <!-- 评论数量 -->
      <van-icon name="comment-o" color="#777" v-if="!article.comment || article.comment == 0" />
      <van-icon name="comment-o" color="#777" :badge="article.comment" v-else />
      <!-- 收藏 -->
      <van-icon name="star" :color="article.is_fav ? '#f00' : '#777'" @click="star()" />
      <!-- 点赞 -->
      <van-icon @click="likestar()" :color="article.is_like ? '#f00' : '#777'" name="good-job" />
      <!-- 转发 -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>


    <!--弹出回复 -->
    <van-popup v-model="show" position="bottom">
      <div class="post-comment">
        <van-field v-model="content" rows="4" autosize ref="content" type="textarea" maxlength="1000" :placeholder="placeholders"
          show-word-limit />
        <div style="width: 100%;">
          <van-button style="background-color: skyblue;" size="large" @click="addcomment()" type="primary">发布</van-button>
        </div>
      </div>
    </van-popup>



<!-- 二级回复 -->
 <van-popup v-model="replyshow" round position="bottom" style="height: 75%;">

 <replycomponent @close="replyshow=false" 
 :article_id="article_id"
  :active_reply_index="active_reply_index" @togglike="commentLike" :replyinfo="commentList[active_reply_index]"></replycomponent>

    <!-- 二级回复 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round @click="openreply(commentList[active_reply_index],active_reply_index,true)" size="small">写评论
      </van-button>
    </div>
 </van-popup>


  </div>
</template>

<script>
import methods from './articleMethods'
import commentListMixin from './commentList'
import '@/common/github-markdown.css'
import { getArticleDetail } from '@/api/home'
import { mapState } from 'vuex'
import replycomponent from './replycomponent.vue'
import { Image, Skeleton, Icon, Divider } from 'vant'

export default {
  data() {
    return {
      show: false,
      article: [],
      article_id: '',
      title: '',
      placeholders:'友善是交流的起点'
    }
  },
  mixins: [commentListMixin],
  // mounted() {
  //   this.loading = false;
  // },
  computed: {
    ...mapState(['uid', 'userInfo'])
  },
  created() {
    let { id, title } = this.$route.query
    this.article_id = id,
      this.title = title
    this.getArticleDetail()
  },
  components: {
    [Image.name]: Image,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [replycomponent.name]:replycomponent
  },
  methods: {
    ...methods,
    // 自动聚焦
    openpopup(){
 if (!this.checkLogin()) return
 this.show=true
 this.placeholders='友善是交流的起点'
 this.comment_type=0;
 this.$nextTick(function(){
  this.$refs.content.focus()
 })
    },
    getArticleDetail() {
      let { article_id, uid: user_id } = this;
      getArticleDetail({
        article_id, user_id
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data)
            this.article = res.data.data;
            console.log('牛逼')
          } else {
            this.$toast(res.data.msg);
          }

        })
    }
  }

}
</script>

<style lang="less" scoped>
// 标题
.title1 {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  font-weight: normal;
  font-size: 20px;
}

.authors {
  display: flex;

  // 发布者头像
  .img1 {
    margin: 10px;
  }

  // 发布者信息
  .txt {
    margin-top: 10px;

    .author1 {
      font-size: 12px;
    }

    .time1 {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }

    p {
      margin-top: 2px;
    }
  }

}

li {
  list-style: none;
  color: #000;
}

// 内容
#lsp {
  // width: 80%;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 18px;
  line-height: 30px;
  // overflow: hidden;
  word-wrap: break-word;
  text-indent: 2.3rem;
}

// 评论区 
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

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;

  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}

.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  flex-wrap: wrap
}

.commentList {
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
}
// .neirong{
//   height: 600px;
// }
</style>
