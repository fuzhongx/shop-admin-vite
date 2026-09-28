import { createStore } from 'vuex'
import { login, getinfo } from "@/api/menager.js";
import { setToken, removeToken } from '@/composables/auto'

const store = createStore({
  state() {
    return {
      //获取用户权限
      user: '',

      //菜单栏折叠宽度
      asideWidth:'250px',

      // 菜单列表
      menus:'',

      //用户操作权限
      ruleNmaes:'',


    }
  },
  mutations: {
    // 登录成功后获取当前管理员信息和权限菜单
    SET_USERINFO(state, user) {
      state.user = user
    },

   //菜单栏宽度
    handleAsideWidth(state){
        state.asideWidth=state.asideWidth=="250px"? '64px' :'250px'
    },
   
    //菜单列表
    SET_MENUS(state,menus){
      state.menus=menus
    },

    //用户操作权限
    SET_RULENAMES(state,ruleNmaes){
      state.ruleNmaes=ruleNmaes
    }
  },
  actions: {
    //登录
    login({ commit }, from) {
      return new Promise((resolve, reject) => {
        login(from).then(res => {
          setToken(res.token)
          resolve(res)
        }).catch(err => reject(err))
      })
    },

    //登录成功后获取当前管理员信息和权限菜单
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo().then(res => {
          commit('SET_USERINFO', res)
          //菜单列表
          commit('SET_MENUS',res.menus) 
          //用户权限
          commit('SET_RULENAMES',res.ruleNames)
          resolve(res)
        }).catch(err => reject(err))
      })
    },

    // 退出登录后清除token和用户状态
    logout({ commit }) {
      //清除token
      removeToken()

      // 清除用户状态
      commit('SET_USERINFO',{})
    }
  }
})

export default store