import axios from '@/until/request';
import {queryParams} from '@/composables/util.js'


//获取列表数据
export function getGoodsList(page = 1,query={}) {
    let r=queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}

// 删除
export function deleteGoods(ids) {
    return axios.post(`/admin/goods/delete_all`,{ids})
}


//新增
export function createGoods(data) {
    return axios.post('/admin/goods', data)
}

//修改
export function updateGoods(id, data) {
    return axios.post(`/admin/goods/${id}`, data)
}

// 修改状态
export function updateGoodsStatus(ids, status) {
    return axios.post(`/admin/goods/changestatus`, { ids,status })
}

