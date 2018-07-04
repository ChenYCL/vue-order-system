<template>
  <div id="cart">
    <div class="cart_content">
      <div class="cart_info">
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数:{{peopleInfoList.p_num}}人</p>
            <p>备注:{{peopleInfoList.p_mark===''?'无':peopleInfoList.p_mark}}</p>
          </div>
          <div @click="editPeopleInfo()" class="p_number_right">
            <img src="../assets/images/edit.png" alt="">
            <p>修改</p>
          </div>
        </div>
        <div class="cart_number">
          <P>购物车中合计{{totalNum}}个菜</P>
          <p>合计:<span class="price">{{allPrice}}</span></p>
        </div>
      </div>
      <!--菜单列表-->
      <div class="cart_list">
        <ul v-for="(item,key) in list" :key="key">
          <li class="item">
            <div class="left_food">
              <img :src="`${api}${item.img_url}`" alt="">
              <div class="food_info">
                <p>{{item.title}}</p>
                <p class="price">{{item.price}}</p>
              </div>
            </div>
            <div class="cart_right">
              <div class="cart_p_num">
                <div class="input_left" @click="DecCartNum(item,key)">-</div>
                <div class="input_center">
                  <input type="text" readonly v-model="item.num" name="">
                </div>
                <div class="input_right" @click="IncCartNum(item,key)">+</div>
              </div>
            </div>
          </li>
        </ul>

      </div>
      <div class="hot_food">
        <!--热门列表-->
        <h3>本店顾客最常点的菜</h3>
        <div class="item_list_outer">
          <ul class="item_list">
            <li>
              <div class="inner">
                <img src="../assets/images/3.jpeg"/>

                <p class="title">主打鸡</p>

                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--导航相关-->

    <!-- 导航点击显示 -->
    <div id="footer_nav" @click="flag=!flag">
      <img src="../assets/images/navigation.png" alt="">
      <p>导航</p>
    </div>
    <div class="footer_nav_show" v-if="flag">
      <ul class="list">
        <router-link to="/start" tag="li">
          <img src="../assets/images/menu.png" alt="">
          <p>菜单</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <img src="../assets/images/cart.png" alt="">
          <p>购物车</p>
        </router-link>
        <router-link to="/order" tag="li">
          <img src="../assets/images/wallet.png" alt="">
          <p>我的订单</p>
        </router-link>
        <router-link to="/orderpay" tag="li">
          <img src="../assets/images/wallet.png" alt="">
          <p>结账</p>
        </router-link>
        <li @click="flag=!flag">
          <img src="../assets/images/close.png" alt="">
          <p>返回</p>
        </li>
      </ul>
    </div>

    <router-link to="/cart">
      <div id="footer_cart">
        <img src="../assets/images/doorder.png" alt="">
        <p>下单</p>
      </div>

    </router-link>

    <div class=" footer_book">
      <router-link to="/home">
        <img src="../assets/images/menu.png" alt="">
        <p>菜单</p>
      </router-link>
    </div>


  </div>
</template>

<script>
  import Config from '../assets/model/config.js';

  export default {
    name: "Cart",
    data() {
      return {
        api: Config.api,
        list: [],
        peopleInfoList: '',
        flag: false,

      }
    },
    components: {},
    computed: {
      allPrice: {
        get: function () {
          let totalPrice = 0;
          this.list.map(v => {
            totalPrice += v.num * v.price
          })
          return totalPrice;
        },
        set: function () {

        }
      },
      totalNum() {
        let total = 0;
        this.list.map(v => {
          total = total + parseInt(v.num);
        })
        return total;
      }
      /* allPrice() {
         return this.list.reduce((allNum, item) => {
           allNum += item.num * item.price
         })
       }*/
    },
    methods: {
      // 获取数据
      async getCartData() {
        try {
          // 二维码
          let api = this.api + 'api/cartlist?uid=a001';
          let res = await this.$http.get(api)
          this.list = res.data.result;
          console.log(res)
        } catch (e) {
          console.log(e);
        }

      },
      // 增加
      async IncCartNum(item, key) {
        try {
          // let res = await this.$http.get(api)
          // this.list = res.data.result;
          let product_id = item.product_id;
          ++item.num;
          let num = item.num;


          let api = this.api + 'api/decCart?uid=a001&product_id=' + product_id + '&num=' + num;
          let res = await this.$http.get(api);
          console.log('增加', this.list);


        } catch (e) {
          console.log(e);
        }

      },
      // 减少
      async DecCartNum(item, key) {
        try {

          // let res = await this.$http.get(api)
          // this.list = res.data.result;
          let product_id = item.product_id;
          if (item.num == 1) {
            // 删除当前这条数据
            console.log(item, key);
            this.list.splice(key, 1);
          } else {
            --item.num;
          }
          let num = item.num;
          let api = this.api + 'api/incCart?uid=a001&product_id=' + product_id + '&num=' + num;
          let res = await this.$http.get(api);
          console.log('减少', this.list);

        } catch (e) {
          console.log(e);
        }

      },
      // 获取用户点餐信息
      async getPeopeleInfoList() {
        try {
          let api = this.api + 'api/peopleinfolist?uid=a001';
          let res = await this.$http.get(api);
          this.peopleInfoList = res.data.result[0];
          console.log(this.peopleInfoList,2222)
        } catch (e) {
          console.log(e);
        }
      },
      editPeopleInfo() {
        this.$router.push({
          name: 'editpeopleinfo', params: {
            p_id: this.peopleInfoList.uid,
            p_num: this.peopleInfoList.p_num,
            p_mark: this.peopleInfoList.p_mark
          }
        });
      }
    },
    mounted() {
      this.getCartData();
      this.getPeopeleInfoList();
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">

  .cart_content {
    padding: 1rem;
    /*头部购物车信息*/
    .cart_info {
      background-color: #fff;
      border-radius: 1rem;
      padding: 1rem;

      h2 {
        color: green;
        text-align: center;
        font-size: 2rem;
        border-bottom: 1px solid #000;
        padding-bottom: 1rem;
      }
      .p_number {
        display: flex;
        height: 5rem;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        padding: 1rem;
        .p_number_left {
          flex: 3;
          height: 4rem;
          p:nth-child(1) {
            color: red;
          }
        }
        .p_number_right {
          flex: 1;
          height: 4rem;
          text-align: right;
          padding-right: 1rem;
          img {
            height: 2rem;
            width: 2rem;
          }
          p {

          }
        }
      }
      .cart_number {
        border-bottom: 1px solid #000;
        padding: 1rem;
        p:nth-child(1) {
          color: blue;
        }
        P:nth-child(2) {
          span.price {
            color: red;
            font-size: 1.6rem;
          }
        }
      }
    }
    /*菜单的列表*/
    .cart_list {
      ul {
        margin-top: .5rem;
        border-bottom: 1px solid #8f8a8a;
      }
      padding: 1rem;
      background: #fff;
      border-radius: .5rem;
      margin-top: .5rem;
      .item {
        display: flex;
        width: 100%;
        padding: .5rem 0;
      }
      .left_food {
        flex: 1;
        display: flex;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 10%;
          margin-right: .5rem;
        }
        .food_info {
          display: inline-block;
          flex: 1;
        }
      }
      .right_cart {
        flex: 1;
      }
    }
  }

  /*购物车数量加减*/

  .cart_p_num {

    width: 10rem;

    display: flex;
    margin-top: .8rem;

    .input_left, .input_right {
      flex: 1;

      width: 2.8rem;
      height: 2.8rem;

      line-height: 2.8rem;

      text-align: center;

      color: red;

      border: 1px solid #eee;

      font-size: 2.4rem;
    }

    .input_center {

      flex: 1;

      input {

        width: 2rem;
        text-align: center;
        width: 100%;
        height: 2.8rem;
        border: none;

        border-top: 1px solid #eee;

        border-bottom: 1px solid #eee;

        float: left;
      }
    }
  }

  /*最常点的菜*/
  .hot_food {
    background-color: #fff;
    margin-top: 1rem;
    h3 {
      font-size: 1.4rem;
      padding: .5rem 0px;
    }
    .item_list_outer {
      width: 100%;
      overflow-x: auto;
      .item_list {
        padding: 0px .5rem;
        width: 100rem;
        li {
          width: 6rem;
          padding: .5rem;
          box-sizing: border-box;
          float: left;
          /*内置*/
          .inner {
            background: #fff;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }

      }
    }

  }

  // 购物车点击
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
    .num {
      position: absolute;
      top: -.5rem;
      right: .5rem;
      display: block;
      width: 2rem;
      height: 2rem;
      color: white;
      background: red;
      border-radius: 50%;
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

  /*购物车空*/
  .cart_empty {
    text-align: center;
    line-height: 3;
    h3 {
      font-size: 1.6rem;
    }
  }
</style>
