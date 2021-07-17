import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    blog
  }
})