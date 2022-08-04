
import { search as searchApi } from '@/api/api'
import { search } from 'vant'
import { Toast,Icon } from 'vant';
import {debounce} from '@/common/utils'

export default {
    data() {
        return {
            value: '',
            searchResult: [],
            searchHistory:[]
        }
    },
    // 组件挂载
    components: {
        [search.name]: search,
        [Toast.name]: Toast,
        [Icon.name]:Icon
    },
    created(){
//     1.先 去本地存储看看
let searchHistory=localStorage.getItem('searchHistory')
if(searchHistory){
    this.searchHistory=JSON.parse(searchHistory)||[]    //  如果有就把他转成json字符串
}
// 如果没有  就拉倒




    },
    methods: {
        onSearchs(e){
           e= e.trim()
           this.searchResultTab(e)
           console.log(e)
    



        },
        onSearch:debounce(function(e){
            e = e.trim()
            if (e.length === 0) {
                this.searchResult = []
                return
            }


            searchApi({
                key_word: e
            })
                .then(res => {
                    if (res.data.code == 0) {
                        this.searchResult = res.data.data
                    }
                })
        }),
        // 搜索内容的跳转    
        searchResultTab(title){
            title=title.trim()  //  去空格
            //  页面要记录下
            let index=this.searchHistory.findIndex(v=>v===title)

            if(index>=0){    //  如果有重复项  删掉
                this.searchHistory.splice(index,1)
            }



            this.searchHistory.unshift(title)     //倒序排列数组
            localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
            this.$router.push('/searchList?key_word='+title)
            // 本地历史记录要记住
        },
        // 删除单个历史记录
        del(index){
            this.searchHistory.splice(index,1)
            localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
        },
        // 删除全部历史记录
        clear(){
            this.searchHistory=[]
            localStorage.setItem('searchHistory',JSON.stringify([]))
        },
        // 历史记录点击  
        historyTab(title){
            this.searchResultTab(title)
        },
        // 取消返回首页
        onCancel() {
            this.$router.back()
            
        },
    },
}