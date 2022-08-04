import http from './http.js';


// 获取分类id
export function getCateList(){
    return http.post('/api/get_cate_list')
}
// 获取文章列表
export function getArticleList(params){
    return http.post('/api/get_article_list',params)
}

// 文章详情
export function getArticleDetail(params){
    return http.post('/api/get_article_detail',params)
}