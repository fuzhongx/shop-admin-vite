import axios from '@/until/request'

/**
* 
* @param {图库列表 page	分页页码 limit 每页显示条数} data 
* @returns 图库列表
*/
export function GetImageClassList(page){
   return axios({
       url:`/admin/image_class/${page}`,
       method:'get',
   })
}

/**
* 
* @param {图库列表 page	分页页码 limit 每页显示条数} data 
* @returns 指定分类下的图库
*/
export function GetImageClass(id,page){
    return axios({
        url:'/admin/image_class/'+id+'/image/'+page,
        method:'get',
    })
 }

//新增图库
 export function CreateImageClass(data){
    return axios({
        url:'/admin/image_class',
        method:'post',
        data
    })
 }

//更新图库
  export function UpdateImageClass(id,data){
    return axios.post('admin/image_class/'+id,data)
 }