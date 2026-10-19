<template>
    <div class="aside_list" :class="{'active':active}">
        <span class="aside-title"><slot/></span>
        <el-button link  size="small" type="primary" class="ml-auto px-1" @click="$emit('edit')">
            <el-icon :size="14">
                <Edit />
            </el-icon>
        </el-button>
        <el-button link  size="small" type="primary" class="px-1"  @click="$emit('delete')">
            <el-icon :size="15">
                <close />
            </el-icon>
        </el-button>
    </div>
</template>
<script setup>

defineProps({
    active:{
        type:Boolean,
        default:false
    }
})

defineEmits(['edit','delete'])

</script>

<style scoped>
.aside_list{
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center  text-gray-600 text-sm p-3;
}
.aside-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.aside_list:hover,.active{
    @apply bg-blue-50;
}
</style>