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

/**
* 
* @param {商品及提示} 
* @returns 店铺及商品提示
*/
export function statistics2(){
    return axios({
        url:`/admin/statistics2`,
        method:'get'
    })
 }

/**
* 
* @param {日期} type 
* @returns 主页图表1
*/
export function statistics3(type){
    return axios({
        url:`/admin/statistics3?type=${type}`,
        method:'get'
    })
 }