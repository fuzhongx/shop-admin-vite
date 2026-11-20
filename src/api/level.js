import axios from '@/until/request';

//获取列表数据
export function getUseLevelList(page = 1) {
    return axios.get(`/admin/user_level/${page}`)
}

// 删除
export function deleteUseLevel(id) {
    return axios.post(`/admin/user_level/${id}/delete`)
}

// 修改状态
export function updateUseLevelStatus(id, status) {
    return axios.post(`/admin/user_level/${id}/update_status`, { status })
}

//新增
export function createUseLevel(data) {
    return axios.post('/admin/user_level', data)
}

//修改
export function updateUseLevel(id, data) {
    return axios.post(`/admin/user_level/${id}`, data)
}


