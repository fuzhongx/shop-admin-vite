import axios from '@/until/request'
import {queryParams} from '@/composables/util.js'

export function getUserList(page,query={}){
    let r=queryParams(query)
    return axios.get(`/admin/user/${page}${r}`)
}


// 修改权限状态
export function updateUserStatus(id,status){
    return axios.post(`admin/user/${id}/update_status`,{status})
}

// 修改管理员
export function updateUser(id,data){
    return axios.post(`/admin/user/${id}`,data)
}
// 新增管理员
export function createUser(data){
    return axios.post(`/admin/user`,data)
}

// 删除管理员
export function deleteUser(id){
    return axios.post(`/admin/user/${id}/delete`)
}