<template>
  <div>
    <router-link to="/home">
      <div class="back">
        <div class="content">
          <i><</i>
          <span class="text">返回</span>
        </div>
      </div>
    </router-link>
    <div class="p_content">
      <div class="p_info" v-cloak>
        <img v-cloak :src="img_url"/>
        <h2>{{list.title}}</h2>
        <p class="price">{{list.price}}元/份</p>
      </div>
      <div class="p_detial">
        <h3>
          商品详情
        </h3>
        <div class="p_content">
          <!--<img :src="`${api}${list.img_url}`"/>-->
          <!--<br/>-->
          <div v-html="list.content"></div>

        </div>
      </div>
    </div>


    <footer class="pfooter">

      <div class="cart">
        <strong>数量:</strong>
        <div class="cart_num">
          <div class="input_left" @click="decNum()">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" v-model="num" name="num" id="num"/>
          </div>
          <div class="input_right" @click="addNum()">+</div>
        </div>

      </div>
      <router-link to="/home">
        <button class="addcart" @click="addCart()">加入购物车</button>
      </router-link>
    </footer>

  </div>
</template>

<script>
  import Config from '../assets/model/config.js';

  export default {
    name: "Pcontent",
    data(){
      return{
        api: Config.api,
        list: {},
        img_url: '',
        num:1
      }
    },
    created(){
      let id = this.$route.query.id;
      this.getQueryData(id);
    },
    mounted() {
      /*    /component/:id
          console.log(this.$route.params);*/
    },
    methods: {
      async addCart(){
        // 桌子号
        let api = this.api+'api/addcart';
        try {
          var res = await this.$http.post(api,{
            uid: 'a001',
            title: this.list.title,
            price: this.list.price,
            num: this.num,
            img_url: this.list.img_url,
            product_id: this.list._id
          });
          if(res.body.success){
            this.$router.push({name:'home',params:{cartNumAdd:this.num}})
          }
        }catch (e) {

        }
      },
      addNum(){
        ++this.num;
      },
      decNum(){
        if(this.num>1){
          --this.num;
        }
      },
      async getQueryData(id) {
        try {
          const response = await this.$http.get(`${this.api}api/productcontent?id=${id}`);
          let list = await response.data.result;
          this.list =  list[0];
          this.img_url = this.api + list[0].img_url

        } catch (error) {
          console.error(error);
        }
      },


    }
  }
</script>

<style scoped lang="scss">
  .p_content {

    .p_info {
      background: #fff;
      img {
        width: 100%;

        height: 18rem
      }

      h2 {
        padding: .2rem .5rem;
      }

      .price {

        padding: .2rem .5rem;

        color: red;
      }
    }

    .p_detial {

      background: #fff;

      margin-top: 1rem;

      h3 {
        padding: .5rem;
      }

      .p_content {
        padding: 1rem;

        img {
          max-width: 100%;

          display: block;

          margin: 0 auto;
        }

        * {

          line-height: 1.5;

          color: #666;
        }
      }
    }

  }

  /*底部*/

  .pfooter {

    position: fixed;

    bottom: 0px;
    height: 4.4rem;
    line-height: 4.4rem;

    background: #fff;

    left: 0px;

    width: 100%;

    border-top: 1px solid #eee;

    .cart {

      float: left;

      display: flex;

      strong {

        flex: 1;

        font-size: 1.6rem;

        padding: 0rem .5rem;
      }

      .cart_num {

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

    }

    .addcart {

      float: right;

      background: red;
      color: #fff;
      height: 3rem;
      border: none;
      padding: 0 .5rem;
      border-radius: .5rem;
      margin-top: .8rem;
      margin-right: .5rem;
    }

  }

  .back {
    position: fixed;
    top: 1rem;
    left: 1rem;
    background: #38332f;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    border-radius: 50%;
    .content {
      i, text {
        font-weight: 600;
      }
      i {
        color: white;
      }
      .text {
        color: white;
      }
    }

  }
</style>
