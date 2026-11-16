import axios from '@/until/request';


//获取角色列表数据
export function getCouponList(page = 1) {
    return axios.get(`/admin/coupon/${page}`)
}

// 删除
export function deleteCoupon(id) {
    return axios.post(`/admin/coupon/${id}/delete`)
}


//新增
export function createCoupon(data) {
    return axios.post('/admin/coupon', data)
}

//修改
export function updateCoupon(id, data) {
    return axios.post(`/admin/coupon/${id}`, data)
}

// 修改状态
export function updateCouponStatus(id, status) {
    return axios.post(`/admin/coupon/${id}/update_status`, { status })
}

