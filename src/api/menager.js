import axios from '@/until/request'

/**
 * 
 * @param {登录账号密码信息} data 
 * @returns 登录
 */
export function login(data){
    return axios({
        url:'/admin/login',
        method:'post',
        data
    })
}

/**
 * 
 * @param {} data 
 * @returns 获取管理员信息和权限菜单
 */
export function getinfo(data){
    return axios({
        url:'/admin/getinfo',
        method:'post',
        data
    })
}

/**
 * 
 * @param {} data 
 * @returns 退出登录
 */
export function logout(data){
    return axios({
        url:'/admin/logout',
        method:'post',
        data
    })
}

/**
 * 
 * @param {} data 
 * @returns 修改密码
 */
export function updatepassword(data){
    return axios({
        url:'/admin/updatepassword',
        method:'post',
        data
    })
}