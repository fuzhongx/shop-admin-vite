import axios from '@/until/request';


//获取角色列表数据
export function getSkusList(page = 1) {
    return axios.get(`/admin/skus/${page}`)
}

// 删除
export function deleteSkus(ids) {
    ids=!Array.isArray(ids)? [ids] : ids
    return axios.post(`/admin/skus/delete_all`,{ids})
}

// 修改状态
export function updateSkusStatus(id, status) {
    return axios.post(`/admin/skus/${id}/update_status`, { status })
}

//新增
export function createSkus(data) {
    return axios.post('/admin/skus', data)
}

//修改
export function updateSkus(id, data) {
    return axios.post(`/admin/skus/${id}`, data)
}


