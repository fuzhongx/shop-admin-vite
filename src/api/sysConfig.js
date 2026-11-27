import axios from '@/until/request'

//获取系统配置
export function getSysConfig(){
    axios.get('/admin/sysconfig')
}

export function updateSysConfig(data){
    axios.post('/admin/sysconfig',data)
}
