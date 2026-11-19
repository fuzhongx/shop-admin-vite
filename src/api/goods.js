import axios from '@/until/request';
import {queryParams} from '@/composables/util.js'


//获取列表数据
export function getGoodsList(page = 1,query={}) {
    let r=queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
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

