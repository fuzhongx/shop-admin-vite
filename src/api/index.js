import axios from '@/until/request'

/**
* 
* @param {后台主页} data 
* @returns 登录
*/
export function statistics1(data){
   return axios({
       url:'/admin/statistics1',
       method:'get',
       data
   })
}
