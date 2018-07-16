<template>
  <div id="start">
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/images/canju.png" alt="餐具"> 用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数，小二马上给你送餐具</p>
      <div class="content">
        <ul class="user_list">
          <li v-for="n in 12" :class="{active:activeIndex[n-1]===1}" ref="uid_click" @click="addChangeEvent(n)">
            <span>{{n}}人</span>
          </li>
        </ul>
      </div>

      <div class="confirm" @click.prevent.stop="sendDesk()">
        <span>确定修改</span>
      </div>

      <div class="cancel" @click.prevent.stop="backCart()">
        <span>取消</span>
      </div>

      <div class="mark_input">
        <input type="text" placeholder="请选择口味" ref="userNeeds" v-model="inputStr">
        <div class="tag">
          <ul>
            <li v-for="(item,key) in inputContent" class="item" v-if="inputContent.length>0">{{item}}<i @click="removeUserWant(key)">x</i></li>
          </ul>
        </div>
      </div>
      <ul class="mark_list">
        <li class="" v-for="item in markListDefault" @click.self="addNeeds(item)">
          <span @click.self="addNeeds(item)">{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Config from '../assets/model/config.js';
  import storage from '../assets/model/storage.js';
  export default {
    name: "Start",
    data() {
      return {
        activeIndex: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        markListDefault: ['打包带走', '不要辣椒', '微辣'],
        inputContent:[],
        inputStr:'',
        api:Config.api,
        num:''
      }
    },
  methods: {
      backCart(){
        // this.$router.push({name:'home'});
        this.$router.go(-1);
      },
      addChangeEvent(i) {

        for (let f = 0; f < 12; f++) {
          this.$set(this.activeIndex, f, 0);
        }
        this.$set(this.activeIndex, i - 1, 1);
        this.num = i;
      },
      addNeeds(name) {
        if(this.inputContent.includes(name)) return;
        if(this.inputStr){
          this.inputStr = '';
        }
        this.inputContent.push(name);
        this.$refs.userNeeds.setAttribute('placeholder','')
      },
      removeUserWant(id){
        this.inputContent.splice(id,1);
      },
      // 提交人数
      async sendDesk(){
        // 桌子号
        let api = this.api+'api/addPeopleInfo';
        try {
          let res = await this.$http.post(api,{
            uid: storage.get('roomid'),
            p_num: this.num,
            p_mark:this.inputStr===''?this.inputContent.join():this.inputStr
          });
          console.log(res);
          if(res.data.success){
            this.$router.push({name:'cart',params:{cartNumAdd:this.num}})
          }
        }catch (e) {

        }
      },
    //  获取初始的修改传递过来的值，之后再回显
      getEditInfo(){
        let desk_num = this.$route.params.p_num;
        let desk_mark = this.$route.params.p_mark;
        let desk_id =  this.$route.params.p_id;
        this.addChangeEvent(Number(desk_num));
        this.inputStr = desk_mark;
      }

    },
    mounted() {
      this.getEditInfo();
    }
  }
</script>

<style scoped lang="scss">
  .start_content .start_header {
    height: 3.2rem;
    line-height: 3.2rem;
    background: #000;
    color: #fff;
    width: 10rem;
    margin: 5rem auto 0rem auto;
    border-radius: .5rem;
  }

  .start_content .start_header img {
    height: 2.2rem;
    line-height: 2.2rem;
    position: relative;
    top: .5rem;
    margin-left: 1rem;
  }

  .start_content .notice {
    text-align: center;
    color: red;
    margin: 1rem 0rem;
  }

  .start_content .user_list {
    display: flex;
    flex-direction: row;
    margin: 1rem .5rem;
    flex-wrap: wrap;
    padding: .5rem;
    justify-content: space-between;
    background: #f7f7f7;
    li.active {
      span {
        background: red;
      }
    }
  }

  .start_content .user_list li {
    width: 25%;
    padding: .5rem;
    box-sizing: border-box;
  }

  .start_content .user_list li span {
    border: 1px solid #ccc;
    border-radius: .5rem;
    display: block;
    height: 3.2rem;
    width: 100%;
    text-align: center;
    line-height: 3.2rem;
    background: #fff;
  }

  .start_content .start {
    position: fixed;
    margin-left: -3rem;
    border-radius: 50%;
    bottom: 5rem;
    text-align: center;
    left: 50%;
    width: 6rem;
    height: 6rem;
    background: red;
  }
  .start_content .confirm {
    position: fixed;
    margin-left: -3rem;
    border-radius: 50%;
    bottom: 5rem;
    left: 30%;
    text-align: center;
    width: 6rem;
    height: 6rem;
    background: lightgray;
  }
  .start_content .cancel {
    position: fixed;
    margin-left: -3rem;
    border-radius: 50%;
    bottom: 5rem;
    text-align: center;
    left: 63%;
    width: 6rem;
    height: 6rem;
    background: lightgray;
  }

  .start_content .confirm span,.start_content .cancel span {
    display: block;
    width: 3rem;
    margin: 0 auto;
    position: relative;
    top: 1.4rem;
  }

  .mark_input {
    text-align: center;
    box-sizing: border-box;
    border-radius: 1rem;
    position: relative;
    .tag{
      position: absolute;
      top:0;
      left: 0;
      margin-left: 2rem;
      margin-top: 2.5rem;
      li{
        display: inline-block;
        border-radius: .5rem;
        border: 1px solid red;
        text-align: center;
        margin: .1rem;
        padding: .2rem;

      }
    }
    input {
      outline: none;
      height: 3rem;
      width: 90%;
      margin: 2rem auto;
      border-radius: 1rem;
    }
  }

  .mark_list {
    width: 90%;
    margin: 0 auto;
    li {
      display: inline-block;
      padding: 1rem 2rem;
      border: 1px solid cadetblue;
      border-radius: 1rem;
      margin: 0 .5rem;
      i{
        color: green;
      }
    }
    li.active {
      background: lightblue;
    }

  }
</style>
