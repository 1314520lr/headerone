import http from './http'


export function sendSms(params){
    return http.post('/user/sendSms',params)
}