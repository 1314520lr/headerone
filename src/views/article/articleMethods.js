import { removefav, addfav, addlike, unlike,reply,commentlike,commentunlike } from "@/api/api"
import { Toast } from "vant";
export default {

    // 收藏取消二合一
    star() {
        if (!this.checkLogin()) return


        let { article: { is_fav }, uid, article_id } = this;
        // 收藏
        if (is_fav) {
            removefav({
                user_id: uid,
                article_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.article.is_fav = false
                    }
                })
        } else {
            addfav({
                user_id: uid,
                article_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.article.is_fav = true
                    }
                })
        }



    },
    likestar() {
        if (!this.checkLogin()) return


        let { article: { is_like }, uid, article_id } = this;
        // 点赞
        if (is_like) {
            unlike({
                user_id: uid,
                article_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.article.is_like = false
                    }
                })
        } else {
            addlike({
                user_id: uid,
                article_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.article.is_like = true
                    }
                })
        }
    },
    // 发布评论
    addcomment(){
        let {uid:user_id,article_id,content,comment_type,reply_comment_id}=this

        content=content.trim()
        if(content.length==0){
            this.$toast('请输入内容')
            return
        }
        reply({
            user_id,article_id,content,comment_type,reply_comment_id
        }).then(res=>{
            console.log(res)
            if(res.data.code==0){
                this.$toast(res.data.msg)
                this.show=false;
               

                // this.skip=0;
                // this.commentFinished=false;
                // this.commentList=[]
                // this.getcommentList()     虽然严谨 但是太浪费
                // this.article.comment++;
                // this.content='';

               if(comment_type==0){
                let {avatar,nickname,username}=this.userInfo
                let commetData={
                    article_id,
                    comment_type:0,
                    content,
                    create_time:new Date().getTime(),
                    info:{
                        avatar,nickname,username
                    },
                    is_like:false,
                    like_count:0,
                    reply_comment_id:"",
                    reply_num:0,
                    user_id,
                    _id:res.data.data.id
                }
                this.skip++
                
                this.commentList.unshift(commetData)
                this.$refs.commentList.scrollTo(0,300)
                this.article.comment++;
                this.content='';
            }else if(comment_type==1){
                if(this.replyshow){
                    // 二级评论
                    this.$Bus.$emit('listrefresh',66666)

                    
                }else{
                    this.commentList[this.active_reply_index].reply_num++
                    let item=this.commentList[this.active_reply_index]
                    let index=this.active_reply_index
                    this.openreply(item,index)
                }
                }
               


               }
       
            
        })
    },
    // 评论点赞
    commentLike(comment_id,index,is_like) {
        if (!this.checkLogin()) return

        let { uid, } = this;
        // 点赞
        if (is_like) {
            commentunlike({
                user_id: uid,
                comment_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.commentList[index].is_like=false
                        this.commentList[index].like_count=res.data.count

                    }
                })
        } else {
            commentlike({
                user_id: uid,
                comment_id
            })
                .then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg)
                        this.commentList[index].is_like=true
                        this.commentList[index].like_count++
                    }
                })
        }
    },
    // 回复评论
    openreply(item,index,ischild){
        if (!this.checkLogin()) return
        let {reply_num,info:{nickname},_id:reply_comment_id}=item;
        this.active_reply_index=index
        if(reply_num==0||ischild){
            // 没人回复的情况
            this.show=true;
            this.comment_type=1
            this.placeholders='回复'+nickname
            this.reply_comment_id=reply_comment_id

             // 自动聚焦
        this.$nextTick(function(){
            this.$refs.content.focus()
           })
            
        }else{
            this.replyshow=true
        }

       
           },
}
