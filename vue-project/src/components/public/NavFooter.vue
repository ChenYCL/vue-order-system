<template>
  <div>
    <!-- 导航点击显示 -->
    <div id="footer_nav" @click="flag=!flag">
      <img src="../../assets/images/navigation.png" alt="">
      <p>导航</p>
    </div>
    <div class="footer_nav_show" v-if="flag">
      <ul class="list">
        <router-link to="/start" tag="li">
          <img src="../../assets/images/menu.png" alt="">
          <p>菜单</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <img src="../../assets/images/cart.png" alt="">
          <p>购物车</p>
        </router-link>
        <router-link to="/order" tag="li">
          <img src="../../assets/images/wallet.png" alt="">
          <p>我的订单</p>
        </router-link>
        <router-link to="/orderpay" tag="li">
          <img src="../../assets/images/wallet.png" alt="">
          <p>结账</p>
        </router-link>
        <li  @click="flag=!flag">
          <img src="../../assets/images/close.png" alt="">
          <p>返回</p>
        </li>
      </ul>
    </div>

    <router-link to="/cart">
      <div id="footer_cart">
        <img src="../../assets/images/cart.png" alt="">
        <p>购物车</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "NavFooter",
    data() {
      return {
        flag: false
      }
    }
  }
</script>

<style scoped lang="scss">

  // 首页导航
  #footer_nav {
    position: fixed;
    bottom: .5rem;
    left: .5rem;
    color: #fff;
    background: rgb(143, 138, 138);
    width: 4rem;
    height: 4rem;
    text-align: center;
    border-radius: 50%;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .4rem;
    }
  ;
    p {
      font-size: .8rem;
      position: relative;
      top: -0.3rem;
    }
  }

  #footer_cart {
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    color: #fff;
    background: red;
    width: 4rem;
    height: 4rem;
    text-align: center;
    border-radius: 50%;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .4rem;
    }
    P {
      font-size: .8rem;
      top: -0.3rem;

    }
  }

  .footer_nav_show {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.6); /*正常模式下无幕布遮罩*/
    .list {
      position: fixed;
      bottom: -15rem;
      left: -14.5rem;
      width: 30rem;
      height: 30rem;
      // border: yellow 1px solid;
      border-radius: 50%;
      display: block;
      box-sizing: border-box;
      li {
        position: absolute;
        transition: all 1s;
        // margin-top: 1rem;
        background: #000;
        text-align: center;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        color: #fff;
        img {
          width: 1.8rem;
          height: 1.8rem;
          margin-top: .5rem;
        }
        P {
          position: relative;
          font-size: .8rem;
          top: -0.5rem;
        }
        // 每一个li
        &:nth-child(1) {
          top: 0;
          left: 50%;
          transform-origin: 0rem 15rem;
        }
        &:nth-child(2) {
          top: 0;
          left: 50%;
          transform-origin: 0rem 15rem;
          transform: rotate(22.5deg);

        }
        &:nth-child(3) {
          top: 0;
          left: 50%;
          transform-origin: 0rem 15rem;
          transform: rotate(45deg);
        }
        &:nth-child(4) {
          top: 0;
          left: 50%;
          transform-origin: 0rem 15rem;
          transform: rotate(70.5deg);

        }
        &:nth-child(5) {
          top: 10.5rem;
          left: 50%;
          transform-origin: 0rem 15rem;
          //transform: rotate(70.5deg);
        }

      }
    }
  }
</style>
