<template>
    <div class="UnloadImage">
        <el-icon><Plus /></el-icon>
    </div>
    <el-upload
        action=""
        ref="upload"
        :auto-upload="false"
        multiple
        :limit="5">
         <template #trigger><el-button size="small" type="primary">select file</el-button></template>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="">upload to server</el-button>
        <template #tip><div class="el-upload__tip">jpg/png files with a size less than 500kb</div></template>
    </el-upload>
    
</template>
<style scoped>
.UnloadImage {
    @apply flex justify-center items-center
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
</style>