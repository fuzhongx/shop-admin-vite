import { createStore } from 'vuex'
import { login, getinfo } from "@/api/menager.js";
import { setToken, removeToken } from '@/composables/auto'

const store = createStore({
  state() {
    return {
      user: ''
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
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