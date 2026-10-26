import axios from '@/until/request';


//获取公告列表数据
export function getNoticeList(page = 1) {
    return axios.get(`/admin/notice/${page}`)
}

// 删除
export function deleteNotice(id) {
    return axios.post(`/admin/notice/${id}/delete`)
}

//新增公告
export function createNotice(data) {
    return axios.post('/admin/notice', data)
}

//修改

//新增公告
export function updateNotice(id,data) {
    return axios.post(`/admin/notice/${id}`, data)
}