<template>
  <div id="order">
    <div class="order_content">
      <div class="order_info">
        <div class="order_top">
          <img src="../assets/images/timer.png" alt="">
          <div class="order_info_right">
            <h2>118号桌待门店接单</h2>
            <p>请及时联系服务员确认以点菜品信息</p>
          </div>
        </div>
        <h3>已点菜品6份,合计：<span class="price">60元</span></h3>
      </div>
      <div class="order_list">
        <h3>菜品详情</h3>
        <ul>
          <li>
            <div class="title">烧茄子</div>

            <div class="num">
              1份
            </div>
            <div class="price">
              12元
            </div>

          </li>
          <li>
            <div class="title">手撕包菜</div>

            <div class="num">
              1份
            </div>
            <div class="price">
              12元
            </div>

          </li>
          <li>
            <div class="title">萝卜干</div>

            <div class="num">
              1份
            </div>
            <div class="price">
              12元
            </div>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Order",

  }
</script>

<style scoped lang="scss">

  .order_content {
    padding: 1rem;

    //订单信息
    .order_info {
      background: #fff;
      border-radius: .5rem;
      .order_top {
        display: flex;
        img {
          width: 5.6rem;
          height: 5.6rem;
        }
        .order_info_right {
          //  右侧
          flex: 1;
          padding-top: .5rem;

        }

      }
      h3 {
        line-height: 2;
        padding: .5rem;
        .price {
          font-size: 1.6rem;
          color: red;
        }
      }

    }

    //   订单列表
    .order_list {
      background: #fff;
      -webkit-border-radius: .5rem;
      -moz-border-radius: .5rem;
      border-radius: .5rem;
      padding: 1rem;
      margin-top: 1rem;
      h3 {
        line-height: 2;
      }
      ul {
        li {
          display: flex;
          line-height: 2;
          .title {
            flex: 2;
          }
          .num {
            flex: 1;
            text-align: center;
          }
          .price {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }

  /*付款的页面*/
  .order_pay {
    background-color: #fff;
    padding: .5rem;
    border-radius: 2rem 0rem .5rem 0rem;
    h3 {
      padding: .5rem;
      font-size: 2rem;
      text-align: center;
    }
    .order_pay_detail {
      display: flex;
      font-size: 1.6rem;
      justify-content: space-around;
      border-bottom: 1px solid #eee;
    }
    .order_pay_info {
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      line-height: 2;
      .price_list {
        margin-left: 1rem;
        .price {
          color: red;
        }
      }
      .pay_button {
        margin-right: 1rem;
        border: 1px solid red;
        background-color: red;
        color: white;
        border-radius: .5rem;
        padding: 0rem .5rem 0rem .5rem;
      }
    }

  }


</style>
