import { useCookies } from "@vueuse/integrations/useCookies";

const TokenKey = 'admin-token'
const cookie = useCookies()

//设置token
export function setToken(token) {
    return cookie.set(TokenKey, token)
}

//获取token
export function getToken() {
    return cookie.get(TokenKey)
}

//清除token
export function removeToken() {
    return cookie.remove(TokenKey)
   
}

//清除NAV列表数据，防止缓存推出后登录还存在数据
export function removeNavlist() {
    return cookie.remove('tabsList')
   
}