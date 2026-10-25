<template>
    <el-upload 
     class="upload-demo"
     drag 
     :action='UploadAction' 
     multiple :headers="{ token }" 
     :data="data" name="img"
     :on-success="UploadSuccess" 
     :on-error="UploadError">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
           打开文件 <em>选择上传图片</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup>
import { UploadAction } from '@/api/image_class'
import { getToken } from '@/composables/auto'
import {toast} from '@/composables/util'

const token = getToken()

defineProps({
    data: {
        type: Object
    }
})

const emits = defineEmits(['success'])

const UploadSuccess = (response, uploadFile, uploadFiles) => {
    toast('上传成功')
    emits('success',{
        response, uploadFile, uploadFiles
    })
}
const UploadError = (error, uploadFile, uploadFiles) => {
    const msg=JSON.parse(error.message).msg
    toast(msg,'error')
}


</script>