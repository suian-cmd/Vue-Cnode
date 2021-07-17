import user from '@/api/user'
import { Message } from 'element-ui'



export default {
  state: {
    loginname: null,
    // loginname: window.localStorage.getItem('loginname') ? window.localStorage.getItem('loginname') : {},
    isLogin: false,
    // isLogin: window.localStorage.getItem('isLogin') ? window.localStorage.getItem('isLogin') : false,
    accesstoken : null,
    userId:null
  },
  getters: {
    loginname: state => state.loginname,
    isLogin: state => state.isLogin,
    accesstoken:  state => state.accesstoken,
    userId:  state => state.userId
  },
  mutations: {
    setUser(state, payload) {
      state.loginname = payload.loginname
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    },
    setAccessToken(state, payload){
      state.accesstoken = payload.accesstoken
    }
    ,
    setUserId(state, payload){
      state.userId = payload.userId
    }
  },
  actions: {
    login({ commit }, { accesstoken }) {
      return user.login({ accesstoken })
        .then(res => {
          if(res.data.success === true){
            // console.log(res)
            commit('setUser', { loginname: res.data.loginname })
            // window.localStorage.setItem('loginname', res.data.loginname)
            commit('setLogin', { isLogin: true })
            // window.localStorage.setItem('isLogin', true)
            commit('setAccessToken',{accesstoken})
            commit('setUserId',{userId: res.data.id})
            Message.success('登录成功')
          }

        })
    },

    async logout({ commit }) {
      commit('setUser', { loginname: null })
      // window.localStorage.setItem('loginname', null)
      commit('setLogin', { isLogin: false })
    //   window.localStorage.setItem('isLogin', false)
    }
  }
}
