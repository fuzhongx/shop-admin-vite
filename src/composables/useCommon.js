import { ref, reactive, computed } from 'vue'
import { toast } from '@/composables/util.js'

//列表，分页， 搜索,删除，修改状态
export function useInitTable(opt = {}) {
    const selectFormRef = ref(null)
    let selectForm = null
    let resetForm = null

    if (opt.selectForm) {
        selectForm = reactive({ ...opt.selectForm }) //通过父组件传过来筛选参数展开自定义
        resetForm = () => { //重置方法
            for (const key in opt.selectForm) {
                selectForm[key] = opt.selectForm[key]
            }
            getData()
        }
    }


    const tableData = ref([])
    const loading = ref(false)

    // 分页
    const currenPage = ref(1)
    const total = ref(1)
    const limit = ref(10)


    //获取数据
    const getData = (p = null) => {
        if (typeof p == 'number') {
            currenPage.value = p
        }
        loading.value = true
        opt.getList(currenPage.value, {
            limit: 5,
            keyword: selectForm.keyWord
        }).then(res => {
            if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
                opt.onGetListSuccess(res)
            } else {
                tableData.value = res.list
                total.value = res.totalCount
            }
        }).finally(() => {
            loading.value = false
        })
    }
    getData()
    const handleDelete = (id) => {
        loading.value = true
        opt.delete(id).then(res => {
            toast('删除成功')
            getData(currenPage.value)
        }).finally(() => {
            loading.value = false
        })
    }

    //修改管理员状态
    const handleStatusChange = (status, row) => {
        row.statusLoading = true
        opt.updateMenagerStatus(row.id, status).then(res => {
            toast('修改状态成功')
            row.status = status
        }).finally(() => {
            row.statusLoading = false
        })
    }


    return {
        selectFormRef,
        selectForm,
        resetForm,
        tableData,
        loading,
        currenPage,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange
    }
}


//修改，新增
export function useInitForm(opt = {}) {
    //区别修改新增操作
    const changeActive = ref(0)
    const FormDrawerRefs = ref(null)
    const formRef = ref(null)
    const noticeTitle = computed(() => changeActive.value ? '修改' : '新增')
    const form = reactive({})
    const rules = opt.rules || {}


    //修改新增共用函数
    const handleCreateNotice = () => {
        UpdataAndCreateActive()
    }

    function UpdataAndCreateActive() {
        FormDrawerRefs.value.showLoading()
        formRef.value.validate((valid) => {
            if (!valid) return
            let fun = changeActive.value ? opt.update(changeActive.value, form) : opt.create(form)
            fun.then(res => {
                FormDrawerRefs.value.hideLoading()
                FormDrawerRefs.value.close()
                toast(changeActive.value ? '修改成功' : '新增成功')
                opt.getData(changeActive.value ? currenPage.value : 1)
            }).finally(() => {
                changeActive.value = 0
                FormDrawerRefs.value.hideLoading()
                FormDrawerRefs.value.close()
            })
        })

    }

    //重置表单
    const resetForm = (row = false) => {
        if (formRef.value) formRef.value.clearValidate()
        for (const key in opt.form) {
            form[key] = row[key]
        }
    }

    //编辑
    const handleUpdateOpen = (row) => {
        FormDrawerRefs.value.open()
        changeActive.value = row.id
        resetForm(row)
    }

    //新增
    const handleCreateOpen = () => {
        changeActive.value = 0
        resetForm(opt.form)
        FormDrawerRefs.value.open()
    }
    return {
        changeActive,
        FormDrawerRefs,
        formRef,
        form,
        rules,
        noticeTitle,
        handleUpdateOpen,
        handleCreateOpen,
        handleCreateNotice,
        resetForm
    }
}
