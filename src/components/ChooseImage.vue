<template>
    <div class="w-[178px] h-[178px] rounded mr-2" v-if="modelValue">
        <el-image  :src="modelValue" fit="cover"></el-image>
    </div>
    <div class="UnloadImage" @click="open">
        <el-icon>
            <Plus />
        </el-icon>
    </div>
    <el-dialog title="图片选择" v-model="dialog" width="80%" top="5vh">
        <el-container class="bg-white rounded" style="height: 80vh;">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图库分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <ImageAside ref="ImageAsideRef" @change="GetChangeAsideID" />
                <ImageMain ref="ImageMainRef" @choose="handleChoose" />
            </el-container>
        </el-container>

        <template #footer>
            <span>
                <el-button @click="() => dialog = false">取消</el-button>
                <el-button type="primary" @click="submit">OK</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'

const dialog = ref(false)

const open = () => dialog.value = true
const close = () => dialog.value = false


const ImageAsideRef = ref(null)

//新增图【ian
const handleOpenCreate = () => {
    ImageAsideRef.value.handleCreateImage()
}

//上传图片
const handleOpenUpload = () => {
    ImageMainRef.value.handleOpenDrawer()
}

const ImageMainRef = ref(null)

//aside传过来的方法
const GetChangeAsideID = (image_class_id) => {
    //调用list主页抛送的方法
    ImageMainRef.value.loadingData(image_class_id)
}

//新增修改上传图片
const props = defineProps({
    modelValue: [String, Array]
})
const emit = defineEmits(['update:modelValue'])

let urls = []
const handleChoose = (changeImage) => {
    urls = changeImage.map(o => o.url)
}

const submit = () => {
    emit('update:modelValue', urls[0])
    close()
}


</script>
<style scoped>
.UnloadImage {
    @apply flex justify-center items-center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: var(--el-transition-duration-fast);
}

.UnloadImage:hover {
    border-color: var(--el-color-primary);
}

.UnloadImage {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
}

.image-header {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
}

.image-aside {
    position: relative;
    border-right: 1px solid #eeeeee;
}

.image-main {
    position: relative;

}

.image-main .top,
.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;

}

.image-main .bottom,
.image-aside .bottom {
    height: 50px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex justify-center items-center;
}
</style>