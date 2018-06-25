<template>
  <div id="home">
    <header class="index_header">
      <div class="hlist">
        <img src="../assets/images/rexiao.png" alt="">
        <p>热销榜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/caidan.png" alt="">
        <p>点过的菜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/sousuo.png" alt="">
        <p>搜你喜欢</p>
      </div>
    </header>
    <aside id="left_cate" class="left_cate">
      <ul>
        <li v-for="item in list">
          {{item.title}}
        </li>
      </ul>
      <div id="nav_cate" class="nav_cate">
        <img src="../assets/images/nav.png" alt="">
        <p>菜单</p>
      </div>
    </aside>

    <div class="content" v-for="item in list" >
      <div class="item">
        <h3 class="item_cate">{{item.title}}</h3>
        <ul class="item_list" >
          <li v-for="k in item.list">
            <div class="inner">
              <img class="item_img" :src="`${api}${k.img_url}`" alt="">
              <p class="title">{{k.title}}</p>
              <p class="price">{{k.price}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg" id="bg">

    </div>

    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import NavFooter from '../components/public/NavFooter.vue';
  import Config from '../assets/model/config.js';
  export default {
    name: "Home",
    created(){
       this.getData();
    },
    data(){
      return{
        list: null,
        api: Config.api
      }
    },
    components:{
      NavFooter
    },
    beforeMount(){
      console.log(this.list);
    },
    methods:{
      asideDom(){
        var nav_btn = document.querySelector('.nav_cate');
        var left_aside = document.querySelector('.left_cate');
        var bg = document.querySelector('#bg');
        bg.onclick = nav_btn.onclick = function (e) {
          e.preventDefault();
          console.log(1);
          if (left_aside.style.transform != 'translate(0px, 0px)') {
            left_aside.style.transform = 'translate(0,0)';
            bg.style.display = 'block';
          } else {
            left_aside.style.transform = 'translate(-100%,0)';
            bg.style.display = 'none';
          }
        }
      },

       async getData(){
        try {
          const response = await this.$http.get(this.api+'api/productlist');
          let list = await response.data.result;
          this.list = list;
          console.log(this.list,list);
        } catch (error) {
          console.error(error);
        }
      }


    },
    mounted() {
        this.asideDom();
    }
  }
</script>

<style scoped lang="scss">
  .index_header {
    display: flex;
    width: 98%;
    height: 4.4rem;
    margin: 0 auto;
    background: #fff;
    margin-top: .2rem;
    .hlist {
      flex: 1;
      text-align: center;
      display: table-cell;
      padding-top: .2rem;
      border-right: 1px solid #ccc;
      img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        vertical-align: middle;
      }
      p {
        text-align: center;
      }
      &:last-child {
        border: none;
      }
    }

  }

  .item {
    .item_cate {
      text-align: center;
      padding: .5rem;
    }
    .item_list {
      display: flex;
      flex-wrap: wrap;
      padding: 0px .5rem;
      li {
        width: 33.3%;
        padding: .5rem;
        box-sizing: border-box;
        .inner {
          border-radius: .5rem;
          overflow: hidden;
          background: #fff;
          width: 100%;
          img {
            width: 100%;
            height: 9.3rem;
            object-fit: cover;

          }
          p {
            padding: .2rem .5rem;
          }
          .title {
            text-align: center;
            font-weight: bold;
          }
          .price {
            text-align: center;
          }
        }
      }
    }
  }

  .left_cate {
    /*过渡效果*/
    transition: all .6s;
    transform: translate(-100%, 0);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 10rem;
    background: #eee;
    z-index: 2;
    ul {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      li {
        line-height: 4.4rem;
        padding-left: 2.5rem;
        color: black;
        // background: #ccc;
        // border: 1px solid gray;
      }
    }
    .nav_cate {
      z-index: 2;
      position: absolute;
      top: 40%;
      left: 100%;
      width: 4rem;
      height: 5rem;
      border: 1px solid gray;
      border-left: 0;
      background: rgba(132, 128, 128, 0.8);
      border-bottom-right-radius: 50%;
      border-top-right-radius: 50%;
      text-align: center;
      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-top: .5rem;
      }
      p {
        color: white;
      }
    }

  }

  .bg {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(132, 128, 128, 0.4);
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0
  }

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
    background: rgba(0, 0, 0, 0.6);  /*正常模式下无幕布遮罩*/
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
