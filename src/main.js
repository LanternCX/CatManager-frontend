import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'

Vue.prototype.axios = axios;
Vue.use(ElementUI);

import VueRouter from 'vue-router'
import All from "@/All";
import Login from "@/Login";
import {getToken} from "@/cookieManager";
Vue.use(VueRouter)

export const constantRouterMap = [
  { path: '/login', component: Login },
  { path: '/home', component: All },
  { path: '*', redirect: '/login'}
]
export const configLoader = {
  baseUrl: "http://127.0.0.1:60001"
}
const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap
});

router.beforeEach(async(to, from, next) => {
  document.title = '厦一海沧 | 校园流浪猫管理系统'
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
