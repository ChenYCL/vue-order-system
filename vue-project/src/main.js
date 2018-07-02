import Vue from 'vue'
import App from './App.vue'


import VueRouter from 'vue-router';
import axios from 'axios';

Vue.prototype.$http = axios;

Vue.use(VueRouter);


const routes = [
  {
    path: '/start',
    name: 'start',
    component: () => import('./components/Start.vue'),
    meta: {title: '开始', icon: ''}
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('./components/Order.vue'),
    meta: {title: '订单', icon: ''}

  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./components/Home.vue'),
    meta: {title: '主页', icon: ''}

  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('./components/Cart.vue'),
    meta: {title: '购物车', icon: ''}

  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('./components/Hot.vue'),
    meta: {title: '热门', icon: ''}

  },
  {
    path: '/pcontent',
    name: 'pcontent',
    component: () => import('./components/Pcontent.vue'),
    meta: {title: '详情', icon: ''}
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./components/Search.vue'),
    meta: {title: '搜索', icon: ''}

  },
  {
    path: '/orderpay',
    name: 'orderpay',
    component: () => import('./components/OrderPay.vue'),
    meta: {title: '付款', icon: ''}

  },
  {
    path: '*',
    name: '404',
    component: () => import('./components/Start.vue'),
    redirect: '/start'

  }
]
var router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),

})
