import axios from '@/until/request'

export function getRuleList(page){
    return axios.get(`/admin/rule/${page}`)
}


// 修改菜单权限状态
export function updateRuleStatus(id,status){
    return axios.post(`/admin/rule/${id}/update_status`,{status})
}

// 修改管理员
export function updateRule(id,data){
    return axios.post(`/admin/rule/${id}`,data)
}
// 新增管理员
export function createRule(data){
    return axios.post(`/admin/rule`,data)
}

// 删除管理员
export function deleteRule(id){
    return axios.post(`/admin/rule/${id}/delete`)
}