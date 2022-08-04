import http from '@/api/http'


// 获取分类
export function addcate(params){
    return http.post('/api/add_article',params)
}

// 搜索
export function search(params){
    return http.get('/api/search',{
        params
    })
}


// 获取评论列表
export function getcommentList(params){
    return http.get('/api/get_comment_list',{
        params
    })
}

// 收藏接口
export function addfav(params){
    return http.post('/api/add_fav',params)
}

export function removefav(params){
    return http.post('/api/remove_fav',params)
}

// 点赞
export function addlike(params){
    return http.post('/api/like',params)
}

export function unlike(params){
    return http.post('/api/unlike',params)
}

// 文章回复
export function reply(params){
    return http.post('/api/add_comment',params)
}


// 评论点赞
export function commentlike(params){
    return http.get('/api/comment_like',{
        params
    })
}

export function commentunlike(params){
    return http.get('/api/comment_unlike',{
        params
    })
}



//获取回复列表
export function getreplylist(params){
    return http.get('api/get_reply_list',{
        params
    })
}