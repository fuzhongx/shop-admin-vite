import axios from '@/until/request'

/**
 * 
 * @param {登录账号密码信息} data 
 * @returns 登录
 */
export function login(data) {
    return axios({
        url: '/admin/login',
        method: 'post',
        data
    })
}

/**
 * 
 * @param 
 * @returns 获取管理员信息和权限菜单
 */
export function getinfo() {
    return axios({
        url: '/admin/getinfo',
        method: 'post',
    })
}

/**
 * 
 * @param {}  
 * @returns 退出登录
 */
export function logout() {
    return axios({
        url: '/admin/logout',
        method: 'post',
    })
}

/**
 * 
 * @param {} data 
 * @returns 修改密码
 */
export function updatepassword(data) {
    return axios({
        url: '/admin/updatepassword',
        method: 'post',
        data
    })
}

//管理员
export function getManagerList(page, query={}) {
    let p = []
    for (const key in query) {
        if (query[key]) {
            p.push(`${key}=${encodeURIComponent(query[key])}`)//防止参数丢失limit=10,keyword='ceshi'
        }

    }
    let r = p.join('&')   //limit=10&keyword=ceshi
    r = r ? `?`+r : '' //?limit=10&keyword=ceshi
    return axios.get(`/admin/manager/${page}${r}`)
}

// 修改管理员状态
export function updateMenagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{status})
}

// 修改管理员
export function updateMenager(id,data){
    return axios.post(`/admin/manager/${id}`,data)
}
// 新增管理员
export function createMenager(data){
    return axios.post(`/admin/manager`,data)
}

// 删除管理员
export function deleteMenager(id){
    return axios.post(`/admin/manager/${id}/delete`)
}