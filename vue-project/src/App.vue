<template>
  <div id="app">
    <!--<router-link to="./start">开始</router-link>-->
    <!--<router-link to="./home">点餐</router-link>-->
    <!--<router-link to="./cart">购物车</router-link>-->
    <br/>
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/basic.scss'  // 全局的样式

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }

</script>

<style lang="scss">

</style>
