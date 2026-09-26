import { showModel, toast } from '@/composables/util';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout, updatepassword } from '@/api/menager.js'
import { ref, reactive } from "vue"


//修改密码
export function useRepassWord() {

    const FormRefs = ref(null)
    const FormDrawerRef = ref(null)

    const FormData = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })

    const rules = {
        oldpassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
    }

    const showLoadig = () => FormDrawerRef.value.showLoading()
    const hideLoadig = () => FormDrawerRef.value.hideLoading()

    //打开修改密码drawer
    const rePasswordOpenDrawer = () => FormDrawerRef.value.open()

    // 修改密码操作
    const submit = () => {
        // FormDrawerRef.value.showLoading()
        showLoadig()
        FormRefs.value.validate((valid) => {
            if (!valid) return

            updatepassword(FormData).then(() => {
                // FormDrawerRef.value.hideLoading()
                hideLoadig()
                //修改成功提示
                toast('修改成功', 'success')
            }).finally(err => {
                // FormDrawerRef.value.hideLoading()
                hideLoadig()
            })
        })

    }

    return {
        FormData,
        FormRefs,
        rules,
        FormDrawerRef,
        rePasswordOpenDrawer,
        showLoadig,
        hideLoadig,
        submit
    }
}


//退出登录
export function uselLoyout() {
    const router = useRouter()
    const store = useStore()

    const handleLoyout = () => {
        showModel('是否退出登录').then(() => {
            logout().finally(() => {
                //清除token //清除用户状态 --可以在vuex里面操作
                store.dispatch('logout')
                // 跳转登录页
                router.push('/login')
                // 提示跳转成功
                toast('退出成功！')
            })
        })
    }

    return {
        handleLoyout
    }

}