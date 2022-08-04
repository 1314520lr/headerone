import http from './http.js'
  



export function publish(params){
    return http.post('/api/add_article ',params)
}



// 获取token
export function getQiniutoken(){
    return http.get('/upload/token')
}

// 上传到七牛云
export function uploadQiniu(formdata){
    return http.post('https://upload-z1.qiniup.com',formdata)
}


