import Vue from 'vue'
import App from './App.vue'


import VueRouter from 'vue-router';
import axios from 'axios';
// socket.io接收
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio,'http://a.itying.com'); // 使用vue-socket.io

Vue.prototype.$http = axios;

Vue.use(VueRouter);

// vue-socket.io的使用
/*
* import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://socketserver.com:1923');


在实例中定义逻辑关系

----
var vm = new Vue({
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton: function(val){
        // $socket is socket.io-client instance
        this.$socket.emit('emit_method', val);
    }
  }
})

---
*/

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
    path: '/editpeopleinfo',
    name: 'editpeopleinfo',
    component: () => import('./components/EditPeopleInfo.vue'),
    meta: {title: '修改点餐信息', icon: ''}

  },
  {
    path: '*',
    name: '404',
    component: () => import('./components/Start.vue'),
    redirect: '/start'

  },

]
var router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  sockets:{
    connect:function () {
      console.log('建立服务器连接');
    }
  },
  render: h => h(App),

})
