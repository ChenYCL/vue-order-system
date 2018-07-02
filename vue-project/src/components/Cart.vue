<template>
  <div id="cart">
    <div class="cart_content">
      <div class="cart_info">
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数:2人</p>
            <p>备注:无</p>
          </div>
          <div class="p_number_right">
            <img src="../assets/images/edit.png" alt="">
            <p>修改</p>
          </div>
        </div>
        <div class="cart_number">
          <P>购物车中合计6个菜</P>
          <p>合计:<span class="price">￥58</span></p>
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
    <NavFooter :cartNum="cartNum"></NavFooter>

    <div class=" footer_book">
      <img src="../assets/images/menu.png" alt="">
      <p>菜单</p>
    </div>


  </div>
</template>

<script>
  import NavFooter from '../components/public/NavFooter.vue';
  import Config from '../assets/model/config.js';
  export default {
    name: "Cart",
    data() {
      return {
        api: Config.api,
        list: []

      }
    },
    props:['cartNum'],
    components: {
      NavFooter
    },
    methods: {

      async getCartData() {
        try {
          // 二维码
          let api = this.api + 'api/cartlist?uid=a001';
          let res = await this.$http.get(api)
          this.list = res.data.result;
          console.log(res)
        }catch (e) {
          console.log(e);
        }

      },
      async IncCartNum(item,key) {
        try {
          // let res = await this.$http.get(api)
          // this.list = res.data.result;
          let product_id = item.product_id;
          ++item.num;
          let num =  item.num;


          let api = this.api + 'api/decCart?uid=a001&product_id='+product_id+'&num='+num;
          let res = await this.$http.get(api);
          console.log(res);

        }catch (e) {
          console.log(e);
        }

      },
      async DecCartNum(item,key) {
        try {

          // let res = await this.$http.get(api)
          // this.list = res.data.result;
          let product_id = item.product_id;
          if(item.num==1){
            // 删除当前这条数据
            console.log(item,key);
            this.list.splice(key,1);
          }else {
            --item.num;
          }
          let num =  item.num;
          let api = this.api + 'api/incCart?uid=a001&product_id='+product_id+'&num='+num;
          let res = await this.$http.get(api);
          console.log(res);

        }catch (e) {
          console.log(e);
        }

      }
    },
    mounted() {
      this.getCartData()
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

  /*购物车空*/
  .cart_empty {
    text-align: center;
    line-height: 3;
    h3 {
      font-size: 1.6rem;
    }
  }
</style>
