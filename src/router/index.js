import Vue from 'vue'
import Router from 'vue-router'
import pc from '@/views/pc'
import wap from '@/views/wap'
import topic from '@/views/pc/topic.vue'
import main from '@/views/pc/main.vue'
import user from '@/views/pc/user.vue'
import getstart from '@/views/pc/getstart.vue'
import api from '@/components/Api'
import reference from '@/views/pc/reference.vue'
import login from '@/components/Login.vue'
import addTopic from "@/views/pc/addTopic";

Vue.use(Router)

// 解决刷新页面，路由重定向错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path : '/',
      redirect : '/pc'
    },
    {
      path: '/pc',
      component: pc,
      children: [
        {
          path: '',
          component: main
        },
        {
          path: 'detail/:id',
          component: topic
        },
        {
          path: 'user/:loginname',
          component: user
        },
        {
          path: 'getstart',
          component: getstart
        },
        {
          path: 'api',
          component: api
        },
        {
          path: 'reference',
          component: reference
        },
        {
          path: 'login',
          component: login
        },
        {
          path:'addTopic',
          component: addTopic
        },
      ]
    },

    {
      path: '/wap',
      name: 'wap',
      component: wap,
    }

  ]
})
