import axios from  '@/until/request';

export function getNoticeList(page=1){
    return axios.get(`/admin/notice/${page}`)
}