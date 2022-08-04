import http from './http'


export function reg(params){
    return http.post('/user/reg ',params)
}


export function loging(params){
    return http.post('/user/login',params)
}
// 获取用户信息
export function info(params){
    return http.post('/user/getuserInfo ',params)
}

// 修改用户信息
export function cinfo(params){
    return http.post('/user/editUserInfo',params)
}

// 注销用户
export function delete_user(params){
    return http.post('/user/delete_user',params)
}

// 修改密码
export function updatePwd(params){
    return http.post('/user/updatePwd',params)
}


// 忘记密码
export function misspwd(params){
    return http.post('/user/forget',params)
}


// 我的发布
export function getmyarticle(params){
    return http.get('/api/get_user_article_list',{
        params
    })
}


// 我的收藏
export function getfavlist(params){
    return http.post('/api/get_fav_list',params)
}

// 浏览历史
export function gethistory(params){
    return http.post('/api/get_history_list',params)
}


// 删除我的发布
export function delsend(params){
    return http.post('/api/del_user_article',params)
}