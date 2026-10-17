import store from '@/store/store.js'

function hasPermission(value,el=false){
     if(!Array.isArray(value)){
        throw new Error(`需要权限配置，例如：v-permisson="['admin ,get']"`)
     }
     let hasAuth=value.findIndex(v=>store.state.ruleNmaes.includes(v)) !=-1 //判断v-permission设定的值是否在ruleNmaes里面包含
     if(el && !hasAuth){
        el.parentNode&& el.parentNode.removeChild(el) //移除节点
     }
     return hasAuth

}

export default{
    install(app){
        app.directive('permission',{
            mounted(el,binding){
                hasPermission(binding.value,el) //=拿到对应的设置自定义v-permission['admin,get']元素节点的值
            }
        })
    }
}