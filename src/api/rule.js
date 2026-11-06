import axios from '@/until/request'

export function getRuleList(page){
    return axios.get(`/admin/rule/${page}`)
}