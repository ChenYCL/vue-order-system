import Vue from 'vue'
import App from './App.vue'


import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Start from './components/Start.vue';
import Cart from './components/Cart.vue';
import Home from './components/Home.vue';
import Order from './components/Order.vue';
import Pcontent from './components/Pcontent.vue';
import Search from './components/Search.vue';
import Hot from './components/Hot.vue';
import OrderPay from './components/OrderPay.vue';

var routes = [
  {
    path: '/start',
    component: Start,

  },
  {
    path: '/order',
    component: Order,

  },
  {
    path: '/home',
    component: Home,

  },
  {
    path: '/cart',
    component: Cart,

  },
  {
    path: '/hot',
    component: Hot,

  },
  {
    path: '/pcontent',
    component: Pcontent,

  },
  {
    path: '/search',
    component: Search,

  },
  {
    path: '/orderpay',
    component: OrderPay,

  },
  {
    path: '*',
    redirect: '/start',
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
