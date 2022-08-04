import {getcommentList} from '@/api/api'
import { List,Popup } from "vant"
export default {
    data(){
        return{
            show:false,
            content:'',
            commentList:[],
            skip:0,
            limit:10,
            commentLoading:false,
            commentFinished:false,
            comment_type:0,
            reply_comment_id:'',   //  回复评论的id
            active_reply_index:0,
            replyshow:false
        }
    },
    components:{
        [List.name]:List,
        [Popup.name]:Popup
    },
    created() {
        
    },
    methods: {
        getcommentList(){
            let {article_id,uid,skip,limit}=this
            getcommentList({
                article_id,uid,skip,limit
            })
            .then(res=>{
                console.log(res.data.data)
                if(res.data.code==0){
                    this.commentList.push(...res.data.data)
                    let len=this.commentList.length
                    if(len>=res.data.count){
                        this.commentFinished=true
                    }else{
                        this.commentLoading=false
                        this.skip=len
                    }
                }
            })
        }
    },
}