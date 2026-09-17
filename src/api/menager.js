import axios from '@/until/request'

export function login(data){
    return axios({
        url:'/admin/login',
        method:'post',
        data
    })
}