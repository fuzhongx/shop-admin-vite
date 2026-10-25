import axios from '@/until/request'

/**
* 
* @param {图库列表 page	分页页码 limit 每页显示条数} data 
* @returns 指定分类下的图库
*/
export function GetImageClass(id,page=1){
    return axios({
        url:'/admin/image_class/'+id+'/image/'+page,
        method:'get',
    })
 }

 //修改图库名称
 export function UpdataImageName(id,name){
    return axios.post(`/admin/image/${id}`,{name})
 }

  //删除图片
  export function DeleteImage(ids){
    return axios.post(`/admin/image/delete_all`,{ids})
 }

// 上传图片
export const UploadAction='/api/admin/image/upload'